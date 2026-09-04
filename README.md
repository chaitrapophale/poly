# POLY — Real-Time Multilingual Voice AI Customer Assistance & Human Handoff

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0+-000000.svg?style=flat&logo=next.js)](https://nextjs.org)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5--flash-4285F4.svg?style=flat&logo=google)](https://ai.google.dev)
[![Agora WebRTC](https://img.shields.io/badge/Agora-WebRTC%20v4.x-099DFD.svg?style=flat&logo=agora)](https://www.agora.io)
[![PyTest Status](https://img.shields.io/badge/PyTest-15%20passed-brightgreen.svg?style=flat&logo=pytest)](backend/app/tests)

**POLY** is a real-time multilingual AI customer assistance voice system. Built with **Agora RTC** for ultra-low latency WebRTC voice streaming, **Google Gemini 2.5 Flash** for multimodal reasoning, **FastAPI**, and **Next.js 16**, Poly enables natural Hindi-English (Hinglish) code-switching, structured information collection, critical-detail verification, uncertainty detection, and sub-50ms human agent handoffs.

---

## 🌟 Key Features

- 🎙️ **Real-Time WebRTC Voice**: Low-latency voice streaming using Agora RTC SDK v4.x (`agora-rtc-sdk-ng`) with automatic echo cancellation and noise suppression.
- 🗣️ **Multilingual & Hinglish Code-Switching**: Speaks naturally in English, Hindi, or fluid Hinglish code-switching without requiring callers to manually switch modes.
- 🧠 **Confidence Engine**: Evaluates signal score, missing required fields, data ambiguity, and clarification attempts to decide `CONTINUE`, `CLARIFY`, `CONFIRM`, or `ESCALATE`.
- 🛡️ **Safety Guardrails Layer**: Strict restriction rules protecting medical diagnosis, legal advice, emergency response, and financial transaction boundaries.
- ⚡ **Sub-50ms Seamless Human Handoff**: Dual-publisher Agora RTC channel handoff that transfers active callers to human support specialists with full context, live transcript, and audit timeline pre-loaded.
- 📊 **Support Specialist Dashboard**: Real-time live escalation queue, case management, call duration analytics, and audit logging.

---

## 🏗️ System Architecture & Data Flow

```
CALLER
  │
  ▼
POLY FRONTEND (Next.js 16 + Tailwind CSS)
  │
  ▼
AGORA REAL-TIME VOICE (agora-rtc-sdk-ng WebRTC)
  │
  ▼
POLY VOICE AGENT (FastAPI Backend + Session Engine)
  │
  ├───────────────────────────────┐
  │                               │
  ▼                               ▼
CONTEXT ENGINE               CONFIDENCE ENGINE
(Entity Extraction)          (Signal & Decision Evaluator)
  │                               │
  └───────────────┬───────────────┘
                  │
                  ▼
             SAFETY LAYER
      (Medical/Legal/Financial Guard)
                  │
                  ▼
           DECISION ENGINE
            /           \
           /             \
   CONTINUE               ESCALATE
      │                      │
      ▼                      ▼
 AI RESPONSE            HUMAN HANDOFF
                             │
                             ▼
                       AGENT DASHBOARD
                             │
                             ▼
                       CASE MANAGEMENT
                             │
                             ▼
                         DATABASE (SQLite / PostgreSQL)
```

---

## 💻 Tech Stack

### Backend
- **Framework**: Python FastAPI (`backend/app/main.py`)
- **LLM Reasoning Engine**: `google-genai` SDK (`gemini-2.5-flash`)
- **WebRTC Token Gateway**: `agora-token-builder`
- **Database & ORM**: SQLAlchemy ORM with SQLite (`backend/poly.db`) / PostgreSQL support
- **Testing**: PyTest & asyncio test suite (`backend/app/tests`)

### Frontend
- **Framework**: Next.js 16 (App Router), TypeScript, React 19
- **Styling**: Vanilla Tailwind CSS + Custom Design System Tokens
- **Voice RTC**: Agora RTC Web SDK (`agora-rtc-sdk-ng`)
- **Icons & Typography**: Lucide React, Google Fonts (`Plus Jakarta Sans`, `Inter`, `Material Symbols Outlined`)

---

## 📂 Project Structure

```
poly/
├── README.md                 # Primary documentation
├── brain.md                  # Brain Architecture & Decision Matrix
├── agent.md                  # Poly Agent Persona & Human Handoff Architecture
├── design.md                 # Visual Design System & UX Architecture
│
├── backend/                  # FastAPI Backend Application
│   ├── app/
│   │   ├── agents/          # Poly Agent persona, entity extraction & turns
│   │   ├── api/v1/          # FastAPI Routers (Agora tokens, Agent turn, Cases, Health)
│   │   ├── core/            # Config & Agora credential validation
│   │   ├── database/        # DB Session & engine configuration
│   │   ├── models/          # SQLAlchemy ORM schemas (User, Case, Message, Escalation, etc.)
│   │   ├── schemas/         # Pydantic schemas for request/response validation
│   │   ├── services/        # Confidence Engine, Safety Layer, Gemini Live & Escalations
│   │   └── tests/           # PyTest automated test suite (15 passed)
│   ├── poly.db              # SQLite Database
│   └── requirements.txt
│
├── frontend/                 # Next.js 16 Frontend Web Application
│   ├── app/
│   │   ├── page.tsx         # Welcome Landing Page
│   │   ├── before-call/     # Pre-call Mic Setup
│   │   ├── call/            # Active Voice Call Interface
│   │   ├── escalation/      # Handoff Transition Page
│   │   ├── human-connected/ # Active Human Connected Screen
│   │   └── agent/           # Agent Support Specialist Dashboard & Case Directory
│   ├── components/          # Reusable UI components (VoiceSphere, ConfidencePill, etc.)
│   └── lib/                 # Agora RTC Web SDK bridge & mock data
│
└── docs/                     # Comprehensive Deep-Dive Documentation
    ├── architecture.md       # Master System Architecture
    ├── brain.md              # Brain Intelligence Specification
    ├── agent.md              # Poly Voice Agent Specification
    ├── design.md             # Visual Design System Specification
    ├── agora-architecture.md # Agora WebRTC Handoff Architecture
    └── gemini-agent.md       # Gemini 2.5 Flash Setup & Prompt Guidelines
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.10+** (Python 3.14 recommended)
- **Node.js 18+** (Node v24 recommended)
- **Agora App ID & Certificate** (Optional for testing mode, required for live WebRTC audio)
- **Google Gemini API Key** (`GEMINI_API_KEY`)

---

### 1. Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create .env file from template
cp .env.example .env

# 4. Configure environment variables in backend/.env
# GEMINI_API_KEY=your_gemini_api_key
# AGORA_APP_ID=your_agora_app_id
# AGORA_APP_CERTIFICATE=your_agora_app_certificate

# 5. Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Backend API will be live at `http://localhost:8000` (Swagger docs at `http://localhost:8000/api/v1/openapi.json`).

---

### 2. Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start Next.js development server
npm run dev
```
Frontend Web App will be live at `http://localhost:3000`.

---

## 🧪 Running Automated Tests

Poly includes a comprehensive PyTest suite verifying safety boundaries, confidence engine decisions, conflict resolutions, and escalation states.

```bash
cd backend
py -m pytest app/tests
```

**Test Coverage Output**:
```text
collected 15 items

app/tests/test_agent.py .......                                 [ 46%]
app/tests/test_escalation.py ....                               [ 73%]
app/tests/test_gemini_live.py ....                              [100%]

======================= 15 passed in 3.30s =======================
```

---

## 📚 Deep-Dive Documentation

For exhaustive technical specifications, read the documentation files:
- 🎨 [Visual Design System (`design.md`)](design.md): Official brand colors, typography scale, component specs, and animations.
- 🧠 [Brain Architecture (`brain.md`)](brain.md): State management schema, signal weights, decision matrix, and conflict resolution.
- 🤖 [Agent Architecture (`agent.md`)](agent.md): Poly prompt persona, Hinglish code-switching, and sub-50ms handoff.
- 📐 [Master System Architecture (`docs/architecture.md`)](docs/architecture.md): High-level system diagram and core stack responsibilities.
- 🎙️ [Agora RTC Architecture (`docs/agora-architecture.md`)](docs/agora-architecture.md): Voice streaming, WebRTC client configuration, and channel handoffs.
- ⚡ [Gemini Live Agent (`docs/gemini-agent.md`)](docs/gemini-agent.md): LLM integration, safety layer evaluation, and API security.

---

## 📄 License

This project is licensed under the MIT License.
