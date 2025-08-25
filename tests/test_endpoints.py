from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_create_and_assign_and_approve():
    chore = {"id": 1, "title": "Dishes", "points": 5}
    res = client.post("/chores", json=chore)
    assert res.status_code == 200

    assignment = {"childId": 1, "choreId": 1}
    res = client.post("/assign", json=assignment)
    assert res.status_code == 200

    res = client.post("/approve", json=assignment)
    assert res.status_code == 200

    res = client.get("/kids/1/points")
    assert res.json()["points"] == 5
