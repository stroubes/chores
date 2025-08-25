from __future__ import annotations
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import User, Chore, Assignment, Reward, PointLedgerEntry
from .storage import DB

app = FastAPI(title="Chore Management System")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chores")
async def create_chore(chore: Chore) -> Chore:
    DB.add_chore(chore)
    return chore


@app.post("/assign")
async def assign_chore(assignment: Assignment) -> Assignment:
    DB.add_assignment(assignment)
    return assignment


@app.post("/complete")
async def complete_chore(assignment: Assignment) -> Assignment:
    # Mark as completed (simplified)
    assignment.status = "completed"
    DB.add_assignment(assignment)
    return assignment


@app.post("/approve")
async def approve_chore(assignment: Assignment) -> Assignment:
    assignment.status = "approved"
    DB.add_assignment(assignment)
    # award points
    chore = DB.chores.get(assignment.choreId)
    if chore:
        DB.add_ledger_entry(PointLedgerEntry(userId=assignment.childId, delta=chore.points, reason=f"Chore {chore.title}"))
    return assignment


@app.get("/kids/{child_id}/points")
async def get_points(child_id: int) -> dict:
    return {"points": DB.get_points(child_id)}


@app.post("/rewards")
async def create_reward(reward: Reward) -> Reward:
    DB.add_reward(reward)
    return reward


@app.post("/redeem")
async def redeem_reward(child_id: int, reward_id: int) -> dict:
    reward = DB.rewards.get(reward_id)
    if not reward:
        return {"status": "not_found"}
    points = DB.get_points(child_id)
    if points >= reward.cost:
        DB.add_ledger_entry(PointLedgerEntry(userId=child_id, delta=-reward.cost, reason=f"Redeemed {reward.name}"))
        return {"status": "approved"}
    return {"status": "insufficient_points"}


@app.get("/chores")
async def list_chores() -> List[Chore]:
    return list(DB.chores.values())


@app.get("/kids/{child_id}/assignments")
async def get_assignments(child_id: int) -> List[Assignment]:
    return [a for a in DB.assignments if a.childId == child_id]
