import pytest
from unittest.mock import MagicMock
from app.agents.poly_agent import PolyAgent
from app.services.session_manager import PolySession

def test_no_contextual_fallback_function_exists():
    """
    Verifies that _synthesize_contextual_fallback function is completely removed from PolyAgent.
    """
    agent = PolyAgent()
    assert not hasattr(agent, "_synthesize_contextual_fallback"), \
        "PolyAgent must NOT have _synthesize_contextual_fallback method! Fake LLM fallbacks are strictly prohibited."

def test_gemini_unavailable_fails_safe():
    """
    Verifies that when Gemini API is unavailable (raises Exception on all candidates),
    PolyAgent DOES NOT return a fake LLM conversational answer.
    It MUST return source='safe_failure', action='ESCALATE', and trigger human escalation.
    """
    agent = PolyAgent()
    agent.client = MagicMock()
    # Mock generate_content raising 429 RESOURCE_EXHAUSTED on all models
    agent.client.models.generate_content.side_effect = Exception("429 RESOURCE_EXHAUSTED: Quota exceeded")

    state = agent.create_initial_state("test-fail-safe-session")
    res = agent.process_turn(state, "I changed my phone number and cannot log in.")

    assert res["source"] == "safe_failure", f"Expected source 'safe_failure', got '{res.get('source')}'"
    assert res["action"] == "ESCALATE", f"Expected action 'ESCALATE', got '{res.get('action')}'"
    assert state["escalation_required"] is True, "Escalation must be triggered when Gemini fails"
    assert "Samajh gaya" not in res["response_text"], "Must not return fake LLM generic template"

def test_gemini_live_model_not_called_in_rest():
    """
    Verifies that gemini-3.1-flash-live-preview is NEVER included in REST model_candidates,
    preventing INVALID_ARGUMENT generate_content errors.
    """
    agent = PolyAgent()
    for model in agent.model_candidates:
        assert "live" not in model.lower(), f"Live model '{model}' must NOT be in REST model_candidates list!"

def test_source_provenance_labels():
    """
    Verifies that REST responses carry source='gemini_rest' and are never mislabeled as 'gemini_live' or 'fallback_llm'.
    """
    session = PolySession("test-provenance-session")
    res = session.interact("How do I update my email?")
    
    assert res["source"] in ["gemini_rest", "safe_failure"], f"Invalid source label: {res.get('source')}"
    assert res["source"] != "gemini_live", "REST response must NOT be labeled as gemini_live"
    assert res["source"] != "fallback_llm", "Source 'fallback_llm' is strictly prohibited"

def test_unseen_verification_code_integration():
    """
    Explicit integration test for UNSEEN caller question:
    'I changed my phone number and now I cannot receive the verification code. What should I do?'
    Proves: caller input -> Gemini REST request -> Gemini response -> returned to caller.
    Fails loudly if Gemini REST fails or source != 'gemini_rest'.
    """
    agent = PolyAgent()
    if not agent.client:
        pytest.skip("Skipping Gemini integration test (Google GenAI Client not initialized)")

    state = agent.create_initial_state("test-unseen-integration")
    unseen_query = "I changed my phone number and now I cannot receive the verification code. What should I do?"
    
    res = agent.process_turn(state, unseen_query)
    
    assert res["source"] == "gemini_rest", f"Expected source 'gemini_rest', got '{res.get('source')}' (Gemini API failed or safe_failure was returned)"
    assert res["model"] is not None, "Model name must be present for gemini_rest response"
    assert res["response_text"] is not None, "Response text must not be None"
    assert len(res["response_text"].strip()) > 10, "Response text must be a complete model answer"
    assert "Samajh gaya" not in res["response_text"], "Fake template fallback detected in model response!"
