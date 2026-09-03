# POLY — Master System Architecture

## Architecture Diagram

```
CALLER
   │
   v
POLY FRONTEND (Next.js 16 + Tailwind CSS)
   │
   v
AGORA REAL-TIME VOICE (agora-rtc-sdk-ng WebRTC)
   │
   v
POLY VOICE AGENT (FastAPI Backend + Session Engine)
   │
   ├───────────────────────────────┐
   │                               │
   v                               v
CONTEXT ENGINE               CONFIDENCE ENGINE
(Entity Extraction)          (Signal & Decision Evaluator)
   │                               │
   └───────────────┬───────────────┘
                   │
                   v
              SAFETY LAYER
       (Medical/Legal/Financial Guard)
                   │
                   v
            DECISION ENGINE
             /           \
            /             \
    CONTINUE               ESCALATE
       │                      │
       v                      v
  AI RESPONSE            HUMAN HANDOFF
                              │
                              v
                        AGENT DASHBOARD
                              │
                              v
                        CASE MANAGEMENT
                              │
                              v
                          DATABASE (SQLite / PostgreSQL)
```

---

## Technical Stack & Responsibilities

1. **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide React, Google Fonts (`Plus Jakarta Sans`, `Inter`, `Material Symbols Outlined`).
2. **Real-time Voice**: Agora RTC Web SDK (`agora-rtc-sdk-ng`) for WebRTC audio streaming, echo cancellation, and noise suppression.
3. **Backend API**: Python FastAPI (`backend/app/main.py`), SQLAlchemy ORM, Uvicorn.
4. **AI Reasoning**: Google Gemini LLM via `google-genai` SDK (`gemini-2.5-flash`), with system instruction persona for natural Hindi + English code-switching.
5. **Safety Guardrails**: Restricted keyword & policy layer preventing medical diagnosis, legal advice, or replacing emergency responders.
6. **Confidence Engine**: Evaluates signal score (missing fields, ambiguity, conflicting numbers, repeated attempts) to decide `CONTINUE`, `CLARIFY`, `CONFIRM`, or `ESCALATE`.
