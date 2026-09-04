# POLY — Voice Agent & Human Handoff Architecture

> **Documentation Note**: This document is also mirrored in [`docs/agent.md`](file:///c:/Users/admin/Desktop/poly%20agora/poly/docs/agent.md).

## Overview

The **POLY Voice Agent** (`poly_agent.py`) is designed as a calm, empathetic, and concise multilingual AI voice persona. It bridges caller voice streams over WebRTC with backend LLM reasoning and real-time human agent escalation.

---

## 🤖 1. Poly Agent Persona & System Instructions

Poly operates under strict behavioral guidelines to maintain high caller satisfaction during customer support voice sessions:

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

## 🗣️ 2. Multilingual & Hinglish Code-Switching

Poly provides native support for Hindi, English, and natural **Hinglish** code-switching.

- **Automatic Language Detection**: Analyzes text patterns per turn to identify language (`Hindi`, `English`, `Hindi + English`).
- **Zero-Friction Code-Switching**: If a caller begins in English ("I have an issue with my reset ticket") and switches to Hindi ("mera reference number 4281 hai"), Poly dynamically mirrors their language style without asking them to switch languages.

---

## 🔄 3. Voice Turn Processing Pipeline

```
[Caller Input Turn]
        │
        ▼
PolyAgent.process_turn(state, caller_input)
        │
        ├─► 1. Safety Check (SafetyLayer.evaluate)
        ├─► 2. Language Detection (_detect_language)
        ├─► 3. Entity & Conflict Extraction (_extract_entities)
        ├─► 4. Confidence Evaluation (ConfidenceEngine.evaluate)
        ├─► 5. LLM Response Generation (Gemini 2.5 Flash / Fallback Engine)
        └─► 6. Structured State Update & Summary Refinement
```

### Response Generation Strategy
- **Primary**: Google Gemini LLM (`gemini-2.5-flash`) initialized via `google-genai` SDK using `GEMINI_API_KEY`.
- **Deterministic Fallback**: If LLM API connectivity is unavailable, Poly falls back to deterministic conversational synthesis to ensure zero call drops or awkward silence.

---

## 🤝 4. Sub-50ms Human Handoff Architecture

When an escalation is triggered (via explicit request, unresolved data conflict, or policy boundary):

```
[Caller Browser] (Channel: "session-8042")
        ▲
        │ Agora Real-Time Voice Channel ("session-8042")
        ▼
[Support Specialist Dashboard] (Joins Channel "session-8042" as Publisher)
```

1. **Case Status Update**: Case status converts to `WAITING_FOR_HUMAN`.
2. **Dashboard Notification**: Appears instantly in the Support Specialist Live Escalation Queue ([/agent/cases](file:///c:/Users/admin/Desktop/poly%20agora/poly/frontend/app/agent/cases/page.tsx)).
3. **Context Transfer**: Confirmed details, uncertain fields, call transcript history, and audit timeline are pre-loaded for the specialist before they accept.
4. **Channel Handoff**: Support agent clicks **Accept Handoff** and joins the exact Agora WebRTC channel (`session-8042`) for instantaneous sub-50ms voice connection with the caller.

---

## 🧪 Verification & Testing

Escalation service and agent handoffs are validated via automated tests:
```bash
cd backend
py -m pytest app/tests/test_escalation.py
```
Outputs: `4 passed` (Verifies queue placement, status transitions, agent assignment, and audit event logs).
