import dataclasses

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from starlette.middleware.cors import CORSMiddleware
from backend.agent import get_joint_recommendation

app = FastAPI(
    title="UCI Friendship Matching API",
    description="Backend for matching users based on interests/bio to UCI CampusGroup events."
)

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserData(BaseModel):
    user1_interests: str
    user1_bio: str
    user2_interests: str
    user2_bio: str

@dataclasses.dataclass
class ResponseModel:
    message: str
    joint_recommendation: dict

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/match_friends")
async def match_friends_endpoint(data: UserData) -> Dict[str, Any]:
    try:
        # print(f"Generating joint recommendation for User 1: {data.user1_interests} and User 2: {data.user2_interests}")
        joint_recommendation = await get_joint_recommendation(
            data.user1_interests, data.user1_bio,
            data.user2_interests, data.user2_bio
        )
        # print(f"Joint Rec: {joint_recommendation}")

        return {
            "message": "Joint recommendation/suggestion generated successfully!",
            "joint_recommendation": joint_recommendation,
        }
    except Exception as e:
        print(f"An error occurred in match_friends_endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "API is running"}