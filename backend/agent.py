from pprint import pprint

from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import AIMessage
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from fetch_campus_group import campus_groups_events_tool
from typing import Optional

# --- Pydantic Models for LLM Output ---
class JointRecommendedEvent(BaseModel):
    type: str = Field(description="Type of recommendation: 'campus_event' or 'on_campus_activity'.")
    name: str = Field(description="Name of the recommended event or suggested activity.")
    description: str = Field(description="Detailed description of the event or activity, explaining why it's a good fit for BOTH users and how it encourages interaction.")
    time: Optional[str] = Field(description="When the event takes place (e.g., 'May 27, 2025 at 10:00 AM'). Required for 'campus_event' type.")
    location: str = Field(description="Where the event or activity takes place (e.g., 'ARC Circle', 'Aldrich Park', 'Student Center Terrace').")
    url: Optional[str] = Field(description="URL to the event page for more details. Required for 'campus_event' type.")
    organizer: Optional[str] = Field(description="The organization or club hosting the event. Applicable for 'campus_event' type.")
    items_needed: Optional[str] = Field(description="Any items users might need for this activity (e.g., 'board games', 'picnic blanket', 'sketchbook'). Applicable for 'on_campus_activity' type.")


class JointRecommendationOutput(BaseModel):
    recommendation: JointRecommendedEvent = Field(description="A single recommended event or on-campus activity for the two users to do together.")
    message: str = Field(description="A friendly message summarizing the recommendation and encouraging the users.")


# --- LLM and Agent Setup ---
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", temperature=0.7)

tools = [campus_groups_events_tool]

parser = JsonOutputParser(pydantic_object=JointRecommendationOutput)

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a highly skilled event recommendation assistant for UC Irvine students.
     Your primary goal is to find a **single, best event or activity** that two users can do together to meet new people and foster friendship.
     You have access to the 'campus_groups_events_tool' tool to search for existing UCI CampusGroups events.

     First, analyze the common interests and themes in both users' interests and bios.
     Then, use the 'campus_groups_events_tool' tool to search for an event that aligns with these commonalities.
     Prioritize events that are inherently social, collaborative, or designed for interaction.

     If you find a suitable event:
     - Clearly explain why it's a good fit for BOTH users.
     - Provide the event's name, description, time, location, and URL.

     If NO suitable CampusGroups events are found after searching based on their combined interests:
     - You MUST instead create a **single, unique, and interesting on-campus activity** suggestion for them to do together at UCI.
     - This activity should be creative, specific, encourage interaction, and ideally leverage their shared interests or be a general good way to meet people on campus.
     - Provide the activity's name, a detailed description, a specific on-campus location, and any items they might need.

     ALWAYS output your final answer as a JSON object strictly adhering to this schema:
     {format_instructions}

     Consider that today is {current_date}. Focus on upcoming events.
     """),
    AIMessage(content="Hello! I can help you find a perfect activity for you and your potential new friend at UCI. Please tell me about both of your interests and bios!"),
    ("placeholder", "{chat_history}"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
]).partial(
    format_instructions=parser.get_format_instructions(),
    current_date="Friday, May 23, 2025" # Inject current date to help LLM find relevant events
)

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True # Crucial when forcing JSON output
)

async def get_joint_recommendation(user1_interests: str, user1_bio: str, user2_interests: str, user2_bio: str) -> dict:
    """
    Takes two users' interests and bios, uses the LLM agent to find a single,
    jointly relevant event or suggest a custom on-campus activity.
    Returns a dictionary adhering to JointRecommendationOutput.
    """
    input_text = (
        f"User 1's interests: {user1_interests}. User 1's bio: {user1_bio}. "
        f"User 2's interests: {user2_interests}. User 2's bio: {user2_bio}. "
        "Find a single UCI CampusGroups event that both users can do together, "
        "or if none are suitable, suggest a creative, specific, on-campus activity "
        "for them to do together to meet people. "
        "Ensure the recommendation is highly social and encourages interaction."
    )

    response = await agent_executor.ainvoke(
        {"input": input_text, "chat_history": []}
    )

    try:
        parsed_output = parser.parse(response['output'])
        return parsed_output
    except Exception as e:
        print(f"Error parsing LLM output: {e}. Raw output: {response['output']}")
        # Generic fallback if LLM fails to return proper JSON, or if its logic breaks
        return {
            "recommendation": {
                "type": "on_campus_activity",
                "name": "Collaborative Mural Drawing at Student Center",
                "description": "If specific events are elusive, a spontaneous art session can be a great way to bond. Find a quiet corner at the Student Center, bring some large paper and drawing supplies (markers, colored pencils). Start a collaborative drawing, where each person adds to the same piece, or draw portraits of each other. This low-pressure activity is highly interactive and can lead to natural conversation and shared laughs.",
                "location": "Student Center Terrace or near Starbucks at Student Center",
                "items_needed": "Large drawing paper, markers, colored pencils, or even just pens."
            },
            "message": "I had trouble finding or formatting a perfect recommendation, but here's a default creative on-campus activity for you two to try!"
        }


if __name__ == "__main__" :
    import asyncio
    output = asyncio.run(get_joint_recommendation(
        user1_interests="Music, Art, and Wellness",
        user1_bio="I like music and art",
        user2_interests="Sports, Music, Art, and Wellness",
        user2_bio="I like music and art.")
    )

    pprint(output)
