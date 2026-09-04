# POLY — Brain Architecture (Intelligence & Decision Engine)

## Overview

The **Brain** of Poly is a real-time intelligence system that combines structured state management, entity extraction, a deterministic **Confidence Engine**, safety guardrails, and Gemini LLM synthesis.

Rather than relying solely on raw LLM generation, Poly processes every voice turn through a multi-stage reasoning pipeline to guarantee safety, detect conflicts in customer data, and initiate human handoffs before caller frustration occurs.

---

## 🏗️ Intelligence Pipeline Architecture

```
[Caller Audio / Voice Input]
          │
          ▼
   1. SAFETY LAYER EVALUATION
   (Medical / Legal / Financial / Emergency Guardrails)
          │
          ├─────────────────────────► [UNSAFE] ──► Trigger ESCALATE
          │
          ▼ [SAFE]
   2. LANGUAGE DETECTION ENGINE
   (Identifies Hindi, English, or mixed Hinglish)
          │
          ▼
   3. ENTITY EXTRACTION & CONFLICT DETECTOR
   (Extracts Customer ID, Reference numbers, Issue Category)
          │
          ▼
   4. CONFIDENCE ENGINE EVALUATION
   (Evaluates signal score, missing fields, conflicts, repetition)
          │
   ┌──────┴───────────────────────────┬───────────────────────────┐
   ▼                                   ▼                           ▼
[CONTINUE]                         [CONFIRM / CLARIFY]         [ESCALATE]
   │                                   │                           │
   ▼                                   ▼                           ▼
Gemini LLM Response              Targeted Verification         Seamless Handoff
Synthesizes under 25 words       ("I heard 4281. Correct?")   Context sent to Agent
```

---

## 📊 1. Structured Conversation State

Poly maintains a clean, structured JSON state per active session to track caller identity, confirmed details, uncertain conflicts, missing information, and escalation flags.

### State Schema Example
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
    {
      "key": "customer_name",
      "label": "Customer Name",
      "value": "Aarav Patel",
      "status": "confirmed"
    }
  ],
  "uncertain_information": [
    {
      "key": "reference_number",
      "label": "Reference Number",
      "value": "4281 / 4289",
      "status": "uncertain",
      "notes": "Conflict detected: initial 4281, then 4289"
    }
  ],
  "missing_information": ["customer_id"],
  "clarification_attempts": 1,
  "escalation_required": false,
  "escalation_reason": null,
  "summary": "Caller discussed account access issue in Hinglish."
}
```

---

## 🎯 2. The Confidence Engine (`confidence_engine.py`)

The **Confidence Engine** acts as the core evaluator for conversation health. It dynamically calculates a confidence score based on five weighted signals:

| Signal Factor | Weight | Description |
| :--- | :--- | :--- |
| **Explicit Human Request** | Critical | Caller asks for a human agent ("talk to agent", "connect me to human") |
| **Unresolved Conflict** | High | Multiple conflicting numbers or data points (e.g. 4281 vs 4289) |
| **Clarification Count** | High | Number of repeated attempts to collect/confirm information (> 2 attempts triggers handoff) |
| **Critical Detail Presence**| Medium | Checks whether Customer ID or Ticket Reference Number is provided |
| **Language Ambiguity** | Low | Detects mixed or shifting language patterns |

### Decision Matrix

- `CONTINUE`: High confidence, normal conversation progression.
- `CLARIFY`: Missing required details or ambiguous input; asks ONE focused question.
- `CONFIRM`: Critical detail extracted; explicitly confirms with caller ("I heard 4281, is that correct?").
- `ESCALATE`: Confidence score drops below threshold, safety violation detected, or explicit human request made.

---

## 🛡️ 3. Safety Layer Guardrails (`safety_layer.py`)

Poly strictly enforces policy guardrails before sending inputs to the LLM. It intercepts high-risk categories and instantly transfers the call to a human specialist.

1. **Medical Boundary**: Blocks diagnosis, medication advice, or medical symptoms.
2. **Legal Boundary**: Blocks legal counsel, lawsuit advice, or formal legal disputes.
3. **Financial / Emergency Boundary**: Prevents unauthorized financial transaction execution or emergency dispatch claims.

---

## ⚡ 4. Conflict Resolution Workflow

When a caller provides conflicting information across turns:
1. The Entity Extractor flags the discrepancy and stores it under `uncertain_information`.
2. The Confidence Engine increments `clarification_attempts`.
3. If the conflict is resolved on the next turn, the item is moved to `confirmed_information`.
4. If clarification fails twice, Poly cleanly announces the handoff to avoid caller frustration and transfers full context to the human support queue.

---

## 🧪 Verification & Testing

The Brain architecture is fully tested via automated PyTest specs:
```bash
cd backend
py -m pytest app/tests/test_agent.py app/tests/test_gemini_live.py
```
Outputs: `15 passed` across all safety boundaries, decision matrix rules, and session state updates.
