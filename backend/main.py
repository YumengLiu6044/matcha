import requests
import json
from pprint import pprint
from pydantic import BaseModel

from backend.fetch_campus_group import get_campus_groups_events

if __name__ == "__main__":
    response = get_campus_groups_events("music", limit=4)
    for item in json.loads(response)["events"]:
        pprint(item)