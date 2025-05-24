import unittest
from main import app, ResponseModel
from fastapi.testclient import TestClient

test_client = TestClient(app)

class MyTestCase(unittest.TestCase):
    def test_read_main(self):
        response = test_client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Hello World"})

    def test_match_users(self):
        header = {
            "Content-Type": "application/json"
        }
        data = {
            "user1_interests": "Music, Art, and Wellness",
            "user1_bio": "I like music and art",
            "user2_interests": "Sports, Music, Art, and Wellness",
            "user2_bio": "I like music and art. I also like to play basketball."
        }
        response = test_client.post("/match_friends", headers=header, json=data)
        assert response.status_code == 200
        assert ResponseModel(**response.json())



if __name__ == '__main__':
    unittest.main()
