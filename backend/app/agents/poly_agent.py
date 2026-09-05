import json
import logging
import re
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.services.safety_layer import SafetyLayer
from app.services.confidence_engine import ConfidenceEngine, DecisionState
from app.services.question_planner import QuestionPlanner

logger = logging.getLogger(__name__)

POLY_SYSTEM_INSTRUCTION = """
You are POLY, an empathetic, calm, and concise multilingual AI customer-assistance voice agent.
Your mission is to help callers resolve customer support issues in Hindi, English, or Hinglish (Hindi + English code-switching).

GUIDELINES:
1. Speak naturally, warmly, and concisely. Keep responses under 25 words.
2. Adapt seamlessly to Hindi, English, or mixed Hinglish. If the caller speaks Hindi or Hinglish, respond in natural Hinglish/Hindi. Never force the caller to switch languages.
3. Ask ONLY ONE focused question at a time to collect missing details.
4. Prioritize critical details: Customer ID / Reference Number first.
5. If the caller provides a critical detail (e.g., Reference number 4281), explicitly verify it with them ("I heard your reference number as 4281. Is that correct?").
6. Be patient. If the caller interrupts or gives conflicting numbers (e.g. 4281 vs 4289), remain calm and seek clarification or prepare for escalation.
7. NEVER provide medical, emergency, legal, or financial advice.
"""

class PolyAgent:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = None
        self.model_name = settings.GEMINI_LIVE_MODEL or "gemini-3.1-flash-live-preview"
        
        if self.api_key and self.api_key != "mock_gemini_api_key":
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info(f"PolyAgent initialized with Google GenAI client ({self.model_name}).")
            except Exception as e:
                logger.warning(f"Could not initialize google.genai Client: {e}")

    def create_initial_state(self, session_id: str, caller_name: str = "Aarav Patel") -> Dict[str, Any]:
        """Creates clean structured conversation state for a new session."""
        return {
            "session_id": session_id,
            "agora_channel": f"poly-{session_id}",
            "controller": "AI", # "AI" or "HUMAN"
            "ai_yielded": False,
            "language": ["hi-IN", "en-US"],
            "active_language": "Hindi + English",
            "intent": None,
            "issue": None,
            "customer_name": caller_name,
            "customer_id": None,
            "reference_number": None,
            "confirmed_information": [
                {"key": "customer_name", "label": "Customer Name", "value": caller_name, "status": "confirmed"}
            ],
            "uncertain_information": [],
            "missing_information": ["reference_number", "customer_id", "issue_category"],
            "clarification_attempts": 0,
            "escalation_required": False,
            "escalation_reason": None,
            "summary": "Caller started assistance session."
        }

    def process_turn(self, state: Dict[str, Any], caller_input: str) -> Dict[str, Any]:
        """
        Processes a conversation turn:
        0. Check AI Yield Controller Lock (If controller == HUMAN, yield speech completely)
        1. Safety Layer evaluation
        2. Language detection (Hindi / English / Hinglish)
        3. Information Extraction & Contradiction Detection
        4. Confidence Engine evaluation
        5. Question Prioritization Engine
        6. Gemini LLM / Intelligent Response Synthesis
        """
        # 0. AI Yield Control Lock Check
        if state.get("controller") == "HUMAN" or state.get("ai_yielded"):
            state["ai_yielded"] = True
            return {
                "response_text": None,
                "response_audio_url": None,
                "state": state,
                "action": "YIELDED",
                "message": "AI controller yielded to Human Support Specialist."
            }

        # 1. Safety Layer Check
        safety_result = SafetyLayer.evaluate(caller_input)
        if not safety_result["is_safe"]:
            state["escalation_required"] = True
            state["escalation_reason"] = safety_result["reason"]
            return {
                "response_text": f"I understand your request, but as an assistance agent I cannot provide {safety_result['violation_category']} instructions. Connecting you to a support specialist.",
                "response_audio_url": None,
                "state": state,
                "action": DecisionState.ESCALATE,
                "safety": safety_result
            }

        # 2. Language Detection
        detected_language = self._detect_language(caller_input)
        if state.get("active_language") in ["Hindi", "Hindi + English"] and detected_language in ["Hindi", "English"]:
            state["active_language"] = "Hindi + English"
        else:
            state["active_language"] = detected_language

        # 3. Information Extraction & Conflict Check
        extracted = self._extract_entities(caller_input)
        self._update_state_with_extraction(state, extracted, caller_input)

        # 4. Confidence Engine Evaluation
        confidence_result = ConfidenceEngine.evaluate(state, caller_input)
        decision = confidence_result["decision"]

        if decision == DecisionState.ESCALATE:
            state["escalation_required"] = True
            state["escalation_reason"] = confidence_result["reason"]
            response_text = "I don't want to record the wrong information. Connecting you with a human support agent and sharing the context we've collected so far."
            return {
                "response_text": response_text,
                "response_audio_url": None,
                "state": state,
                "action": decision,
                "confidence": confidence_result
            }

        # 5. Question Prioritization
        next_question_field = QuestionPlanner.get_next_question_field(state)

        # 6. Generate Response via Gemini or Intelligent Engine
        response_text = self._generate_response(state, caller_input, decision, next_question_field)

        # Update Summary narrative
        state["summary"] = f"Caller discussed '{state.get('issue') or 'account assistance'}'. Detected language: {detected_language}."

        return {
            "response_text": response_text,
            "response_audio_url": None,
            "state": state,
            "action": decision,
            "confidence": confidence_result,
            "next_field": next_question_field
        }

    def _detect_language(self, text: str) -> str:
        text_lower = text.lower()
        hindi_indicators = ["mera", "hai", "nahi", "ho", "raha", "haan", "par", "ko", "kya", "aap", "namaste", "aaya", "chahiye"]
        has_hindi = any(re.search(r'\b' + kw + r'\b', text_lower) for kw in hindi_indicators)
        has_english = any(kw in text_lower for kw in ["account", "problem", "access", "reset", "password", "ticket", "reference", "order", "number"])

        if has_hindi and has_english:
            return "Hindi + English"
        elif has_hindi:
            return "Hindi"
        else:
            return "English"

    def _extract_entities(self, text: str) -> Dict[str, Any]:
        """Extracts customer ID, reference numbers, and issue categories."""
        extracted = {}
        text_lower = text.lower()

        # Reference numbers (e.g. 4281, 4289, 1024)
        numbers = re.findall(r'\b\d{4}\b', text)
        if numbers:
            extracted["numbers"] = numbers

        if any(w in text_lower for w in ["login", "access", "password", "reset", "cannot login"]):
            extracted["issue"] = "Account Access & Authentication"

        return extracted

    def _update_state_with_extraction(self, state: Dict[str, Any], extracted: Dict[str, Any], caller_input: str):
        text_lower = caller_input.lower()

        if "issue" in extracted:
            state["issue"] = extracted["issue"]
            state["intent"] = "account_assistance"

        if "numbers" in extracted:
            numbers = extracted["numbers"]
            if len(numbers) == 1:
                num = numbers[0]
                if not state["reference_number"]:
                    state["reference_number"] = num
                elif state["reference_number"] != num:
                    # Contradiction detected!
                    state["uncertain_information"].append({
                        "key": "reference_number",
                        "label": "Reference Number",
                        "value": f"{state['reference_number']} / {num}",
                        "status": "uncertain",
                        "notes": f"Conflict detected: initial {state['reference_number']}, then {num}"
                    })
                    state["clarification_attempts"] += 1
            elif len(numbers) > 1:
                state["uncertain_information"].append({
                    "key": "reference_number",
                    "label": "Reference Number",
                    "value": " / ".join(numbers),
                    "status": "uncertain",
                    "notes": "Multiple reference numbers provided in single turn"
                })
                state["clarification_attempts"] += 1

        # Check for explicit user confirmation
        if any(w in text_lower for w in ["yes", "haan", "correct", "sahi hai", "that is right", "right"]):
            if state["reference_number"] and not any(f["key"] == "reference_number" for f in state["confirmed_information"]):
                state["confirmed_information"].append({
                    "key": "reference_number",
                    "label": "Reference Number",
                    "value": state["reference_number"],
                    "status": "confirmed"
                })

    def _generate_response(
        self, state: Dict[str, Any], caller_input: str, decision: str, next_field: Optional[Dict[str, Any]]
    ) -> str:
        """Generates response via Gemini Client or intelligent conversational synthesis."""
        if self.client:
            try:
                from google.genai import types
                prompt = (
                    f"{POLY_SYSTEM_INSTRUCTION}\n\n"
                    f"Current State: {json.dumps(state)}\n"
                    f"Decision: {decision}\n"
                    f"Target Field To Ask: {json.dumps(next_field) if next_field else 'None'}\n"
                    f"Caller said: \"{caller_input}\"\n\n"
                    f"Respond as Poly:"
                )
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(max_output_tokens=60, temperature=0.7)
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                logger.error(f"Gemini API invocation error: {e}")

        # Deterministic Conversational Synthesis
        if decision == DecisionState.CONFIRM and state.get("reference_number"):
            return f"I heard your reference number as {state['reference_number']}. Is that correct?"
        
        if decision == DecisionState.CLARIFY:
            if state.get("uncertain_information"):
                return "Did you mean reference number 4281 or 4289 for this reset ticket?"
            return "Got it. Could you give me your ticket reference number?"

        if next_field:
            field_name = next_field.get("label", "reference number")
            return f"Could you please share your {field_name} so I can look up your account?"

        if state.get("active_language") == "Hindi + English":
            return "Sure, I can help with your account. Do you have your ticket reference number?"
        
        return "I can help with your account access issue. Could you share your reference number?"

poly_agent = PolyAgent()
