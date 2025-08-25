from fastapi.testclient import TestClient
import pytest
from backend.main import app
from backend.storage import DB

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    DB.users.clear()
    DB.chores.clear()
    DB.assignments.clear()
    DB.rewards.clear()
    DB.ledger.clear()
    yield
    DB.users.clear()
    DB.chores.clear()
    DB.assignments.clear()
    DB.rewards.clear()
    DB.ledger.clear()


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


def test_list_chores_and_assignments():
    chore = {"id": 2, "title": "Laundry", "points": 3}
    client.post("/chores", json=chore)
    assignment = {"childId": 2, "choreId": 2}
    client.post("/assign", json=assignment)

    res = client.get("/chores")
    assert any(c["id"] == 2 for c in res.json())

    res = client.get("/kids/2/assignments")
    data = res.json()
    assert data and data[0]["choreId"] == 2
