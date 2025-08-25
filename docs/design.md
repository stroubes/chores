# Chore Management System Design

## Overview
This document outlines a touch-friendly chore management system for three kids. The application is intended to run on a 24-inch vertical monitor and includes a parent-facing backend for managing chores, schedules, and rewards.

## Goals
- Encourage children to complete both required and optional chores.
- Offer a gamified experience with points and redeemable rewards.
- Allow parents to create, assign, and approve chores.
- Support recurring schedules and flexible point values.

## Architecture
### Frontend
- **Framework:** React (Next.js or Vite) with TypeScript for maintainability.
- **Layout:** Vertical orientation with large touch targets and responsive design.
- **Animations:** Utilize Framer Motion or CSS animations for engaging transitions and reward celebrations.
- **Gamification:**
  - Animated progress bars and confetti when chores are completed.
  - Avatar selection and point counter for each child.
  - Unlockable badges or levels to encourage repeat visits.

### Backend
- **Framework:** Node.js with Express or NestJS; alternatively, a Python FastAPI service.
- **Database:** PostgreSQL or MongoDB.
- **Authentication:** Simple parent admin login; children identified by name or avatar.
- **Key Endpoints:**
  - `POST /chores` – create or update chores.
  - `POST /assign` – assign chores to children and schedule them.
  - `POST /complete` – child marks a chore as done; status pending approval.
  - `POST /approve` – parent confirms completion.
  - `GET /kids/:id/points` – current point total and badges.
  - `POST /rewards` – create rewards with point cost.
  - `POST /redeem` – child requests reward; parent approves.
- **Scheduling:** Cron-like job to generate daily/weekly chores and reset optional chore availability.

## Data Model
- **User:**
  - `id`, `name`, `role` (parent or child), `avatar`.
- **Chore:**
  - `id`, `title`, `description`, `points`, `required` (boolean), `schedule` (daily/weekly/custom).
- **Assignment:**
  - `childId`, `choreId`, `status` (pending, completed, approved), `dueDate`.
- **Reward:**
  - `id`, `name`, `cost`, `description`.
- **PointLedger:** tracks awarded and spent points.

## Workflow
1. Parent creates chores and assigns schedules.
2. Children log in and see their chore board for the day with optional bonus chores.
3. Child taps a chore to start; upon completion they mark it done.
4. Parent approves via admin view, awarding points if applicable.
5. Children browse the reward store and redeem points, triggering a parent approval flow.

## UI Considerations
- Full-screen kiosk mode with swipe or tap navigation.
- Color-coded chore categories and progress trackers.
- Sound effects and quick feedback to make completing chores satisfying.

## Future Enhancements
- Leaderboards among siblings.
- Seasonal events or limited-time bonus chores.
- Integration with voice assistants for reminders.
- Support for push notifications on tablets or phones.

