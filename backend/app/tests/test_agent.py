import pytest
from app.agents.poly_agent import PolyAgent
from app.services.safety_layer import SafetyLayer
from app.services.confidence_engine import ConfidenceEngine, DecisionState
from app.services.session_manager import SessionManager

def test_safety_boundary_medical():
    result = SafetyLayer.evaluate("Can you prescribe me medicine for my headache?")
    assert result["is_safe"] is False
    assert result["violation_category"] == "medical"

def test_safety_boundary_legal():
    result = SafetyLayer.evaluate("Can you give me legal advice to sue my landlord?")
    assert result["is_safe"] is False
    assert result["violation_category"] == "legal"

def test_safety_boundary_safe():
    result = SafetyLayer.evaluate("Mera account login nahi ho raha. I need help resetting password.")
    assert result["is_safe"] is True

def test_confidence_engine_human_request():
    state = {"clarification_attempts": 0, "uncertain_information": [], "missing_information": []}
    result = ConfidenceEngine.evaluate(state, "I want to talk to a human specialist.")
    assert result["decision"] == DecisionState.ESCALATE

def test_confidence_engine_conflict_escalation():
    state = {
        "clarification_attempts": 1,
        "uncertain_information": [{"key": "reference_number", "value": "4281 / 4289"}],
        "missing_information": []
    }
    result = ConfidenceEngine.evaluate(state, "I am not sure about the number.")
    assert result["decision"] == DecisionState.ESCALATE

def test_poly_agent_multilingual_detection():
    agent = PolyAgent()
    lang = agent._detect_language("Mera account reset nahi ho raha and I tried password link")
    assert lang == "Hindi + English"

def test_session_lifecycle():
    sm = SessionManager()
    session = sm.get_or_create("test-session-1")
    assert session.session_id == "test-session-1"
    
    turn_res = session.interact("Mera account login nahi ho raha.")
    assert turn_res["response_text"] is not None
    assert len(session.transcript) >= 3
