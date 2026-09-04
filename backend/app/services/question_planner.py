from typing import Dict, Any, List, Optional

CATEGORY_REQUIRED_FIELDS = {
    "Account Access & Authentication": [
        {"key": "reference_number", "label": "Reference Number", "priority": 1, "critical": True},
        {"key": "customer_id", "label": "Customer ID", "priority": 2, "critical": True},
        {"key": "issue_category", "label": "Issue Category", "priority": 3, "critical": False}
    ],
    "Order & Delivery Support": [
        {"key": "reference_number", "label": "Order Reference Number", "priority": 1, "critical": True},
        {"key": "customer_name", "label": "Customer Name", "priority": 2, "critical": False},
        {"key": "issue_description", "label": "Issue Description", "priority": 3, "critical": False}
    ],
    "Default": [
        {"key": "reference_number", "label": "Ticket / Reference Number", "priority": 1, "critical": True},
        {"key": "issue_category", "label": "Issue Category", "priority": 2, "critical": False}
    ]
}

class QuestionPlanner:
    @staticmethod
    def get_next_question_field(state: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Determines the single highest-priority unanswered or uncertain field to ask the caller about.
        """
        category = state.get("issue") or "Default"
        fields = CATEGORY_REQUIRED_FIELDS.get(category, CATEGORY_REQUIRED_FIELDS["Default"])
        
        confirmed_keys = [f.get("key") for f in state.get("confirmed_information", [])]
        uncertain_keys = [f.get("key") for f in state.get("uncertain_information", [])]

        # 1. Prioritize uncertain critical fields needing clarification
        for field in fields:
            if field["key"] in uncertain_keys:
                return field

        # 2. Prioritize unconfirmed missing fields in priority order
        for field in sorted(fields, key=lambda x: x["priority"]):
            if field["key"] not in confirmed_keys:
                return field

        return None
