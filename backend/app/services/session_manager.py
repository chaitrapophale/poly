import uuid
from typing import Dict, Any, Optional
from app.agents.poly_agent import poly_agent
from app.database.session import SessionLocal
from app.models.all_models import Case, Conversation, Message, ExtractedInformation, CaseStatus

class PolySession:
    def __init__(self, session_id: str, caller_name: str = "Aarav Patel"):
        self.session_id = session_id
        self.agora_channel = f"poly-{session_id}"
        self.state = poly_agent.create_initial_state(session_id, caller_name)
        self.transcript: list = [
            {
                "id": "t-0",
                "speaker": "poly",
                "name": "POLY Assistant",
                "timestamp": "00:05",
                "originalText": "Namaste! Welcome to Poly Support. How can I help you with your account today?",
                "translatedText": "Namaste! Welcome to Poly Support. How can I help you with your account today?"
            }
        ]

    def interact(self, text: str) -> Dict[str, Any]:
        """Processes caller voice/text turn and updates session state and transcript."""
        turn_id = f"t-{len(self.transcript) + 1}"
        
        # Record caller turn
        self.transcript.append({
            "id": turn_id,
            "speaker": "caller",
            "name": self.state["customer_name"],
            "timestamp": "00:15",
            "originalText": text,
            "translatedText": text,
            "language": self.state["active_language"]
        })

        # Poly Agent processing turn
        agent_result = poly_agent.process_turn(self.state, text)
        response_text = agent_result["response_text"]

        # Record Poly response turn
        poly_turn_id = f"t-{len(self.transcript) + 1}"
        self.transcript.append({
            "id": poly_turn_id,
            "speaker": "poly",
            "name": "POLY Assistant",
            "timestamp": "00:20",
            "originalText": response_text,
            "translatedText": response_text
        })

        # If escalation was triggered, persist case to database
        if self.state["escalation_required"]:
            self._persist_escalated_case()

        return {
            "session_id": self.session_id,
            "agora_channel": self.agora_channel,
            "response_text": response_text,
            "action": agent_result["action"],
            "state": self.state,
            "transcript": self.transcript
        }

    def _persist_escalated_case(self):
        """Persists case to database upon escalation."""
        db = SessionLocal()
        try:
            case_number = f"POLY-{1024 + db.query(Case).count()}"
            db_case = Case(
                case_number=case_number,
                language=self.state["active_language"],
                issue_category=self.state.get("issue") or "Account Access & Authentication",
                status=CaseStatus.WAITING_FOR_HUMAN,
                escalation_reason=self.state.get("escalation_reason") or "Information uncertainty threshold reached",
                summary=self.state.get("summary") or "Escalated assistance call",
                otp_verified=True
            )
            db.add(db_case)
            db.commit()
            db.refresh(db_case)

            # Persist extracted fields
            for item in self.state.get("confirmed_information", []):
                field = ExtractedInformation(
                    case_id=db_case.id,
                    field_key=item["key"],
                    field_label=item["label"],
                    field_value=item["value"],
                    status="confirmed"
                )
                db.add(field)

            for item in self.state.get("uncertain_information", []):
                field = ExtractedInformation(
                    case_id=db_case.id,
                    field_key=item["key"],
                    field_label=item["label"],
                    field_value=item["value"],
                    status="uncertain",
                    notes=item.get("notes")
                )
                db.add(field)

            db.commit()
        except Exception as e:
            db.rollback()
        finally:
            db.close()

class SessionManager:
    def __init__(self):
        self._sessions: Dict[str, PolySession] = {}

    def get_or_create(self, session_id: Optional[str] = None) -> PolySession:
        if not session_id or session_id not in self._sessions:
            sid = session_id or f"session-{uuid.uuid4().hex[:8]}"
            self._sessions[sid] = PolySession(sid)
            return self._sessions[sid]
        return self._sessions[session_id]

    def get(self, session_id: str) -> Optional[PolySession]:
        return self._sessions.get(session_id)

session_manager = SessionManager()
