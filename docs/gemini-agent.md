# POLY — Gemini Voice Agent & Intelligence Architecture

## 1. Selected Model & SDK
- **SDK**: `google-genai` (Official current Google GenAI Python SDK)
- **Model**: `gemini-2.5-flash`
- **Why Selected**: `gemini-2.5-flash` provides low-latency multimodal reasoning, structured entity extraction, and multilingual support for Hindi + English code-switching.

---

## 2. Server-Side Security Architecture

```
[Browser Client]
       │
       │ (Sends text/voice transcript turn to FastAPI backend)
       ▼
[FastAPI Backend: /api/v1/agent/interact]
       │
       │ (Evaluates Safety & Confidence; authenticates with GEMINI_API_KEY server-side)
       ▼
[Google Gemini API (gemini-2.5-flash)]
```

*CRITICAL SECURITY RULE*: `GEMINI_API_KEY` is loaded server-side from `backend/.env`. It is NEVER exposed to the frontend browser bundle.

---

## 3. Poly Agent Persona & System Instruction

```text
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
```

---

## 4. Structured Conversation State

```json
{
  "session_id": "session-8042",
  "language": ["hi-IN", "en-US"],
  "active_language": "Hindi + English",
  "intent": "account_assistance",
  "issue": "Account Access & Authentication",
  "customer_name": "Aarav Patel",
  "customer_id": null,
  "reference_number": "4281",
  "confirmed_information": [
    {"key": "customer_name", "label": "Customer Name", "value": "Aarav Patel", "status": "confirmed"}
  ],
  "uncertain_information": [
    {"key": "reference_number", "label": "Reference Number", "value": "4281 / 4289", "status": "uncertain", "notes": "Conflict detected"}
  ],
  "missing_information": ["customer_id"],
  "clarification_attempts": 1,
  "escalation_required": false,
  "escalation_reason": null,
  "summary": "Caller discussed account access issue in Hinglish."
}
```

---

## 5. Confidence Engine & Decision Matrix

1. **Explicit Human Request**: Triggers `ESCALATE` immediately.
2. **Repeated Clarification (> 2 attempts)**: Triggers `ESCALATE` to prevent caller frustration.
3. **Unresolved Information Conflict**: Triggers `ESCALATE` with summary package for support specialist.
4. **Unverified Critical Detail**: Triggers `CONFIRM` ("I heard 4281. Is that correct?").
5. **Missing Info**: Triggers `CLARIFY`.
6. **Normal Flow**: Triggers `CONTINUE`.

---

## 6. Testing Procedure

Run automated PyTest suite:
```bash
cd backend
python -m pytest app/tests/test_agent.py
```
Outputs: `7 passed` (Verifies medical boundary, legal boundary, safe query, human request escalation, conflict escalation, Hinglish language detection, and session turn processing).
