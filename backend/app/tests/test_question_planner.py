import pytest
from app.services.question_planner import QuestionPlanner

def test_question_planner_missing_reference():
    state = {
        "issue": "Account Access & Authentication",
        "confirmed_information": [],
        "uncertain_information": []
    }
    field = QuestionPlanner.get_next_question_field(state)
    assert field is not None
    assert field["key"] == "reference_number"
    assert field["critical"] is True

def test_question_planner_uncertain_field_priority():
    state = {
        "issue": "Account Access & Authentication",
        "confirmed_information": [],
        "uncertain_information": [{"key": "reference_number", "value": "4281 / 4289"}]
    }
    field = QuestionPlanner.get_next_question_field(state)
    assert field is not None
    assert field["key"] == "reference_number"
