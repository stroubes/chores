from __future__ import annotations
from pydantic import BaseModel
from typing import Optional, List


class User(BaseModel):
    id: int
    name: str
    role: str  # 'parent' or 'child'
    avatar: Optional[str] = None


class Chore(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    points: int = 0
    required: bool = False
    schedule: Optional[str] = None  # e.g. 'daily', 'weekly'


class Assignment(BaseModel):
    childId: int
    choreId: int
    status: str = "pending"  # pending, completed, approved
    dueDate: Optional[str] = None


class Reward(BaseModel):
    id: int
    name: str
    cost: int
    description: Optional[str] = None


class PointLedgerEntry(BaseModel):
    userId: int
    delta: int
    reason: str
