from __future__ import annotations
from typing import Dict, List
from .models import User, Chore, Assignment, Reward, PointLedgerEntry


class InMemoryDB:
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.chores: Dict[int, Chore] = {}
        self.assignments: List[Assignment] = []
        self.rewards: Dict[int, Reward] = {}
        self.ledger: List[PointLedgerEntry] = []

    def add_user(self, user: User) -> None:
        self.users[user.id] = user

    def add_chore(self, chore: Chore) -> None:
        self.chores[chore.id] = chore

    def add_assignment(self, assignment: Assignment) -> None:
        self.assignments.append(assignment)

    def add_reward(self, reward: Reward) -> None:
        self.rewards[reward.id] = reward

    def add_ledger_entry(self, entry: PointLedgerEntry) -> None:
        self.ledger.append(entry)

    def get_points(self, user_id: int) -> int:
        return sum(e.delta for e in self.ledger if e.userId == user_id)

DB = InMemoryDB()
