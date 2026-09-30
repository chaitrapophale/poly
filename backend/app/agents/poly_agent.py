import json
import logging
import re
import time
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.services.safety_layer import SafetyLayer
from app.services.confidence_engine import ConfidenceEngine, DecisionState
from app.services.question_planner import QuestionPlanner

logger = logging.getLogger(__name__)

POLY_SYSTEM_INSTRUCTION = """
You are POLY, an authentic, empathetic, highly intelligent, open-ended conversational AI customer support voice agent built by Poly Agora.
Your role is to have genuine, natural, fluid conversations with callers about ANY customer support, technical assistance, billing, account access, email updates, app issues, verification codes, support hours, order tracking, or general inquiries.

CRITICAL CONVERSATIONAL RULES:
1. NEVER use a rigid question tree, fixed questionnaire, or canned response.
2. DO NOT repeatedly ask for a ticket or reference number. Only ask for a ticket/reference number if checking an existing case is genuinely required for the caller's request, or if the caller mentions having one. If the caller says they don't know their ticket number, help them directly with their issue.
3. ADAPT SEAMLESSLY TO THE CALLER'S LANGUAGE:
   - If the caller speaks English, respond naturally in English.
   - If the caller speaks Hindi ("Mera account login nahi ho raha"), respond in warm, natural Hindi.
   - If the caller speaks Hinglish or code-switches ("Actually mera password reset ho gaya but email nahi aa raha"), respond in natural Hinglish.
4. HANDLE TOPIC SWITCHES NATURALLY:
   - If the caller changes topics (e.g. "Actually, forget that, I have a billing question"), drop the old topic immediately and address the new question directly.
5. RESOLVE CONTEXTUAL REFERENCES:
   - Use the full conversation history to understand references like "the email", "it", "that", "my reset link", or "the payment".
6. KEEP RESPONSES CONCISE AND SPOKEN-FRIENDLY:
   - Poly is a voice agent. Keep answers clear, direct, empathetic, and concise (typically 1 to 3 short sentences suitable for text-to-speech).
7. SAFETY:
   - Strictly refuse medical diagnoses, emergency guidance, legal advice, or financial advice.
"""

class PolyAgent:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = None
        base_model = settings.GEMINI_MODEL or "gemini-3.5-flash"
        self.model_candidates = [
            base_model,
            "gemini-3.8-flash",
            "gemini-3.7-flash",
            "gemini-3.6-flash",
            "gemini-3.1-flash-lite",
            "gemini-flash-latest",
            "gemini-flash-lite-latest"
        ]
        # Preserve order while removing duplicates
        self.model_candidates = list(dict.fromkeys(self.model_candidates))
        self.model_name = self.model_candidates[0]
        
        if self.api_key and self.api_key != "mock_gemini_api_key":
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info(f"PolyAgent initialized with Google GenAI client (candidates: {self.model_candidates}).")
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
            "ticket_mentioned": False,
            "confirmed_information": [
                {"key": "customer_name", "label": "Customer Name", "value": caller_name, "status": "confirmed"}
            ],
            "uncertain_information": [],
            "missing_information": [],
            "clarification_attempts": 0,
            "escalation_required": False,
            "escalation_reason": None,
            "summary": "Caller started assistance session."
        }

    def process_turn(
        self, state: Dict[str, Any], caller_input: str, transcript: Optional[List[Dict[str, Any]]] = None, turn_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Processes a conversation turn dynamically:
        0. AI Yield Controller Check
        1. Safety Layer Check
        2. Language Detection
        3. Dynamic Entity & Topic Switch Detection
        4. Confidence Engine Evaluation
        5. Question Prioritization
        6. Gemini LLM Reasoning Generation
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

        # 3. Dynamic Information Extraction & Topic Shift Check
        extracted = self._extract_entities(caller_input, state)
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

        # 5. Question Prioritization (only for genuine missing fields/conflicts)
        next_question_field = QuestionPlanner.get_next_question_field(state)

        # 6. Generate Natural Language Response via Gemini REST model chain (generate_content only)
        gen_result = self._generate_response(state, caller_input, decision, next_question_field, transcript=transcript, turn_id=turn_id)
        
        if isinstance(gen_result, tuple):
            response_text, source, model_used = gen_result
        else:
            response_text, source, model_used = gen_result, "gemini_rest", self.model_name

        if source == "safe_failure" or response_text is None:
            state["escalation_required"] = True
            state["escalation_reason"] = "Gemini AI reasoning service unavailable across all REST candidate models."
            safe_text = "I am experiencing temporary connection difficulties with my reasoning service. Connecting you directly with a human support specialist right away."
            logger.warning(f"[SAFE_FAILURE_TRIGGERED] turn_id={turn_id or 'N/A'} source=safe_failure action=ESCALATE")
            return {
                "response_text": safe_text,
                "response_audio_url": None,
                "state": state,
                "action": DecisionState.ESCALATE,
                "source": "safe_failure",
                "model": None,
                "error": "Gemini API unavailable or rate-limited"
            }

        # Update Summary narrative dynamically
        state["summary"] = f"Caller discussed: '{state.get('issue') or 'general inquiry'}'. Detected language: {detected_language}."

        return {
            "response_text": response_text,
            "response_audio_url": None,
            "state": state,
            "action": decision,
            "confidence": confidence_result,
            "next_field": next_question_field,
            "source": source,
            "model": model_used
        }

    def _detect_language(self, text: str) -> str:
        text_lower = text.lower()
        hindi_indicators = ["mera", "hai", "nahi", "ho", "raha", "haan", "par", "ko", "kya", "aap", "namaste", "aaya", "chahiye", "kaise", "bhi", "ek", "baar", "kal", "se", "kar"]
        has_hindi = any(re.search(r'\b' + kw + r'\b', text_lower) for kw in hindi_indicators)
        has_english = any(kw in text_lower for kw in ["account", "problem", "access", "reset", "password", "ticket", "reference", "order", "number", "email", "login", "help", "hours", "charged", "code", "app", "billing", "payment"])

        if has_hindi and has_english:
            return "Hindi + English"
        elif has_hindi:
            return "Hindi"
        else:
            return "English"

    def _extract_entities(self, text: str, state: Dict[str, Any]) -> Dict[str, Any]:
        """Extracts reference numbers, ticket mentions, and topic shifts dynamically."""
        extracted = {}
        text_lower = text.lower()

        # Check for dynamic Topic Switch signals ("actually", "forget that", "another question", "billing question", etc.)
        topic_switch_signals = ["actually", "forget that", "another question", "different issue", "different problem", "by the way", "instead"]
        if any(sig in text_lower for sig in topic_switch_signals):
            extracted["topic_switch"] = True

        # Check if caller mentions having or not having a ticket number
        if any(w in text_lower for w in ["don't know my ticket", "no ticket", "don't have a ticket", "no reference"]):
            extracted["ticket_unknown"] = True
        elif any(w in text_lower for w in ["ticket", "reference", "ref number", "case number"]):
            extracted["ticket_mentioned"] = True

        # Reference numbers (e.g. 4281, 4289, 1024)
        numbers = re.findall(r'\b\d{4}\b', text)
        if numbers:
            extracted["numbers"] = numbers

        # Dynamic Issue Labeling
        if any(w in text_lower for w in ["login", "access", "password", "reset", "cannot login", "login nahi", "logout", "log me out", "logging me out"]):
            extracted["issue"] = "Account Access & Authentication"
        elif any(w in text_lower for w in ["charged", "billing", "payment", "refund", "receipt", "deduct"]):
            extracted["issue"] = "Billing & Payments"
        elif any(w in text_lower for w in ["hours", "timings", "schedule", "open", "close"]):
            extracted["issue"] = "General Support & Operations"
        elif any(w in text_lower for w in ["order", "delivery", "shipping", "track"]):
            extracted["issue"] = "Order & Delivery Support"
        elif any(w in text_lower for w in ["email", "change email", "update email"]):
            extracted["issue"] = "Account Settings & Profile"
        elif any(w in text_lower for w in ["app", "crash", "bug", "freeze", "code", "otp", "verification"]):
            extracted["issue"] = "App & Technical Support"

        return extracted

    def _update_state_with_extraction(self, state: Dict[str, Any], extracted: Dict[str, Any], caller_input: str):
        text_lower = caller_input.lower()

        # Handle topic switch
        if extracted.get("topic_switch") and "issue" in extracted:
            state["issue"] = extracted["issue"]
            state["intent"] = extracted["issue"].lower().replace(" ", "_")
            # Clear obsolete clarification locks on topic shift
            state["uncertain_information"] = []
            state["clarification_attempts"] = 0
        elif "issue" in extracted:
            state["issue"] = extracted["issue"]
            state["intent"] = extracted["issue"].lower().replace(" ", "_")

        if extracted.get("ticket_unknown"):
            state["ticket_mentioned"] = False
        elif extracted.get("ticket_mentioned"):
            state["ticket_mentioned"] = True

        if "numbers" in extracted:
            numbers = extracted["numbers"]
            if len(numbers) == 1:
                num = numbers[0]
                if not state["reference_number"]:
                    state["reference_number"] = num
                elif state["reference_number"] != num:
                    # Contradiction detected
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

    def _clean_response_text(self, text: str) -> str:
        """Strips structural prompt leaks, markdown headers, and formatting artifacts if emitted."""
        if not text:
            return ""
        cleaned = text.strip()
        # Remove structural prompt leaks
        patterns = [
            r'^---.*?\n',
            r'^Dialogue History:?\*?\*?',
            r'^Goal:?\*?\*?.*?\n',
            r'^Respond as POLY:?',
            r'^POLY:?'
        ]
        for p in patterns:
            cleaned = re.sub(p, '', cleaned, flags=re.IGNORECASE | re.MULTILINE).strip()
        return cleaned

    def _generate_response(
        self,
        state: Dict[str, Any],
        caller_input: str,
        decision: str,
        next_field: Optional[Dict[str, Any]],
        transcript: Optional[List[Dict[str, Any]]] = None,
        turn_id: Optional[str] = None,
        request_id: Optional[str] = None
    ) -> tuple[Optional[str], str, Optional[str]]:
        """
        Generates response strictly via Gemini REST models (generate_content only).
        Returns tuple: (response_text, source, model_name).
        If all REST candidates fail, returns (None, "safe_failure", None).
        """
        active_turn_id = turn_id or f"turn_{len(transcript or []) + 1}"
        active_req_id = request_id or f"req-{active_turn_id}"

        logger.info(f"[POLY_TURN_START] turnId={active_turn_id} request_id={active_req_id} callerText=\"{caller_input}\"")
        logger.info(f"[POLY_AGENT_INPUT] turnId={active_turn_id} request_id={active_req_id} text=\"{caller_input}\" history_length={len(transcript or [])}")
        
        history_turns = []
        if transcript:
            for t in transcript[-15:]:
                speaker = "Caller" if t.get("speaker") == "caller" else "POLY"
                text = t.get("originalText") or t.get("original_text") or ""
                clean_text = self._clean_response_text(text)
                if clean_text:
                    history_turns.append(f"{speaker}: {clean_text}")
        history_str = "\n".join(history_turns) if history_turns else f"Caller: {caller_input}"

        context_summary = (
            f"Active Topic: {state.get('issue') or 'General Inquiry'}, "
            f"Language: {state.get('active_language')}, "
            f"Decision: {decision}"
        )

        prompt = (
            f"Context: {context_summary}\n"
            f"Conversation History:\n{history_str}\n\n"
            f"Caller: \"{caller_input}\"\n"
            f"POLY:"
        )

        if self.client:
            from google.genai import types
            for target_model in self.model_candidates:
                # SAFETY CHECK: Ensure Live models are NEVER called via generate_content
                if "live" in target_model.lower():
                    logger.error(f"[MODEL_SEPARATION_VIOLATION] Refusing to call Live model '{target_model}' via generate_content REST API.")
                    continue

                logger.info(f"[POLY_REST_REQUEST] request_id={active_req_id} turn_id={active_turn_id} model={target_model} api=google.genai function=generate_content")
                
                try:
                    response = self.client.models.generate_content(
                        model=target_model,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=POLY_SYSTEM_INSTRUCTION,
                            max_output_tokens=350,
                            temperature=0.7
                        )
                    )
                    if response and response.text:
                        raw_text = response.text
                        resp_text = self._clean_response_text(raw_text)
                        
                        logger.info(
                            f"[POLY_REST_SUCCESS] request_id={active_req_id} turn_id={active_turn_id} "
                            f"model={target_model} http_status=200 status=success source=gemini_rest "
                            f"text=\"{resp_text}\""
                        )
                        logger.info(f"[GEMINI_RAW_TEXT] request_id={active_req_id} turn_id={active_turn_id} text=\"{raw_text}\"")
                        logger.info(f"[GEMINI_ASSEMBLED_TEXT] request_id={active_req_id} turn_id={active_turn_id} text=\"{resp_text}\"")
                        logger.info(f"[POLY_AGENT_OUTPUT] request_id={active_req_id} turn_id={active_turn_id} text=\"{resp_text}\" source=gemini_rest")
                        logger.info(f"[BACKEND_SENT_TEXT] request_id={active_req_id} turn_id={active_turn_id} text=\"{resp_text}\" source=gemini_rest")
                        return (resp_text, "gemini_rest", target_model)
                except Exception as e:
                    http_status = 429 if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e) else 500
                    logger.warning(
                        f"[POLY_REST_FAILURE] request_id={active_req_id} turn_id={active_turn_id} "
                        f"model={target_model} http_status={http_status} status=failed "
                        f"exception_type={type(e).__name__} error=\"{str(e)[:200]}\""
                    )

        # ALL REST CANDIDATES FAILED OR CLIENT UNAVAILABLE -> SAFE FAILURE STATE (NO FAKE LLM FALLBACK)
        logger.error(
            f"[POLY_REST_ALL_MODELS_FAILED] request_id={active_req_id} turn_id={active_turn_id} "
            f"source=safe_failure error=\"All Gemini REST models unavailable or rate-limited\""
        )
        return (None, "safe_failure", None)

poly_agent = PolyAgent()


