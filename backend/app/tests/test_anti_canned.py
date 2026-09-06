import pytest
from app.agents.poly_agent import PolyAgent

def test_anti_canned_responses():
    """
    Verifies that unrelated questions produce contextually distinct responses,
    never output generic template fallbacks ('Samajh gaya... assist kar sakta hoon'),
    and never output old canned ticket templates.
    """
    agent = PolyAgent()
    state = agent.create_initial_state("test-anti-canned-session")

    unrelated_questions = [
        "How do I change my email?",
        "What are your support hours?",
        "I was charged twice.",
        "My app keeps logging me out.",
        "Why isn't my verification code coming?",
        "Can I export my account data to a file?"
    ]

    responses = []
    for q in unrelated_questions:
        res = agent.process_turn(state, q)
        resp_text = res.get("response_text")
        
        assert resp_text is not None, f"Response text for '{q}' should not be None"
        
        # EXPLICIT ANTI-CANNED / ANTI-FALLBACK CHECKS:
        assert "Could you give me your ticket reference number?" not in resp_text, \
            f"Universal ticket fallback detected for question '{q}': {resp_text}"
        assert "Samajh gaya." not in resp_text, \
            f"Generic template fallback detected for question '{q}': {resp_text}"
        assert "ke bare mein main assist kar sakta hoon" not in resp_text, \
            f"Generic assist template detected for question '{q}': {resp_text}"
        
        responses.append(resp_text)

    # Ensure responses are contextually different
    unique_responses = set(responses)
    assert len(unique_responses) == len(responses), \
        f"Responses were repeated instead of contextually generated! Unique: {len(unique_responses)} / {len(responses)}"

def test_unseen_conversational_inputs():
    """
    Verifies that unseen conversational inputs (greetings, name inquiry, payment options, language switch, human escalation)
    return natural conversational responses without generic input-echo templates.
    """
    agent = PolyAgent()
    state = agent.create_initial_state("test-unseen-session")

    unseen_inputs = [
        ("हेलो", ["नमस्ते", "पॉली", "सपोर्ट", "Hello", "hi", "assist"]),
        ("आपका नाम बताइए", ["पॉली", "Poly", "नाम", "name", "agent"]),
        ("मुझे ट्रेन टिकट लेना है", ["टिकट", "पेमेंट", "ऑनलाइन", "ticket", "book", "help"]),
        ("ऑनलाइन पेमेंट करूं या ऑफलाइन?", ["ऑनलाइन", "ऑफलाइन", "पेमेंट", "टिकट", "payment", "online", "counter"]),
        ("Actually मुझे Mumbai जाना है", ["Mumbai", "मदद", "टिकट", "सहायता", "travel", "help"]),
        ("Can you explain that in English?", ["English", "explain", "assist", "switch", "happy", "problem", "course", "sure"]),
        ("नहीं, मेरा मतलब ट्रेन की टिकट से था", ["टिकट", "ट्रेन", "मदद", "ticket", "train", "सहायता"]),
        ("मुझे किसी इंसान से बात करनी है", ["Human", "Specialist", "कनेक्ट", "होल्ड", "person", "representative", "मदद", "नमस्ते", "सहायता", "हल", "समस्या", "परेशानी", "इंसान", "बात"])
    ]

    for user_input, expected_keywords in unseen_inputs:
        res = agent.process_turn(state, user_input)
        resp_text = res.get("response_text")
        
        assert resp_text is not None, f"Response for '{user_input}' must not be None"
        assert "Samajh gaya." not in resp_text, f"Generic fallback 'Samajh gaya' detected for '{user_input}': {resp_text}"
        assert "ke bare mein main assist kar sakta hoon" not in resp_text, f"Generic assist template detected for '{user_input}': {resp_text}"
        
        if res.get("source") == "safe_failure":
            assert res.get("action") == "ESCALATE", "safe_failure must trigger ESCALATE action"
            assert "connection difficulties" in resp_text.lower() or "human support specialist" in resp_text.lower(), \
                f"safe_failure response text must inform caller of connection issue: {resp_text}"
        else:
            has_keyword = any(kw.lower() in resp_text.lower() for kw in expected_keywords)
            assert has_keyword, f"Response '{resp_text}' for '{user_input}' did not contain expected keywords: {expected_keywords}"
