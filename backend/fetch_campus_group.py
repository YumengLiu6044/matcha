import json
import requests
from langchain.tools import Tool
import html


def get_campus_groups_events(*args, **kwargs) -> str:
    """
    Fetches events from the UCI CampusGroups API based on a search query or category.

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
        "limit": 20,
        "order": "undefined",
        "filter7": "on_campus",
    }


    try:
        response = requests.get(base_url, headers=headers, params=params, timeout=10)
        response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)

        data = response.json()
        if len(data) == 0:
            return json.dumps({"events": []})

        result_length = data[0]["counter"]
        result_length = int(result_length)

        if result_length == 0:
            return json.dumps({"events": []})

        extracted_response = []

        for result in data:
            expected_fields = result["fields"].split(",")
            extracted = {}
            for index, field in enumerate(expected_fields):
                extracted[field] = html.unescape(result[f"p{index}"] or "")

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
    Useful for fetching a list of upcoming events from the UCI CampusGroups API.
    This tool takes no input parameters and returns a general list of events.
    The LLM should analyze the returned events to find relevant matches for the users.
    """
)