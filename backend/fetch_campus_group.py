import json
import requests
from pydantic import BaseModel
from langchain.tools import Tool


class RequestFormat(BaseModel):
    query: str
    limit: int = 20

def get_campus_groups_events(query: str = "", limit: int = 20) -> str:
    """
    Fetches events from the UCI CampusGroups API based on a search query or category.

    Args:
        query (str): A search term for events (e.g., "hiking", "coding", "social").
        category_id (str): The ID of a specific event category (e.g., "50920" for Wellness & Recreation).
                           Refer to CampusGroups API documentation or previous API calls for valid IDs.
        limit (int): The maximum number of events to return. Defaults to 20.

    Returns:
        str: A JSON string of events found, or an error message.
    """
    base_url = "https://campusgroups.uci.edu/mobile_ws/v17/mobile_events_list"
    headers = {
        'Content-Type': 'application/json',
        "Referer": "https://campusgroups.uci.edu/events",
    }

    params = {
        "range": 0,
        "limit": limit,
        "order": "undefined",
        "filter7": "on_campus",
        "search_word": query,
    }


    try:
        response = requests.get(base_url, headers=headers, params=params, timeout=10)
        response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)

        data = response.json()
        result_length = data[0]["counter"]
        result_length = int(result_length)

        if result_length == 0:
            return json.dumps({"events": []})

        extracted_response = []

        for result_index in range(1, result_length + 1):
            result = data[result_index]
            expected_fields = result["fields"].split(",")
            extracted = {}
            for index, field in enumerate(expected_fields):
                extracted[field] = result[f"p{index}"]

            extracted_response.append(extracted)

        return json.dumps({"events": extracted_response})

    except requests.exceptions.HTTPError as http_err:
        return json.dumps({"error": f"HTTP error occurred: {http_err} - {response.text}"})
    except requests.exceptions.ConnectionError as conn_err:
        return json.dumps({"error": f"Connection error occurred: {conn_err}. Check internet connection."})
    except requests.exceptions.Timeout as timeout_err:
        return json.dumps({"error": f"The request timed out: {timeout_err}. API might be slow."})
    except requests.exceptions.RequestException as req_err:
        return json.dumps({"error": f"An unexpected error occurred: {req_err}"})
    except json.JSONDecodeError as json_err:
        return json.dumps({"error": f"Failed to decode JSON response: {json_err} - Response: {response.text}"})

# Create the LangChain Tool
campus_groups_events_tool = Tool(
    name="get_campus_groups_events",
    func=get_campus_groups_events,
    description="""
    Fetch events from the UCI CampusGroups API.
    Input should be a JSON string with 'query' and optionally 'limit' keys.
    For example: '{"query": "hiking", "limit": 5}' or '{"query": "coding"}'
    Use 'query' to search for general terms like "social", "sports", "tech", "art", "music", "volunteering", "outdoors", "games", "film", "wellness".
    """,
    args_schema=RequestFormat # This is a placeholder for more detailed schema validation if needed
)