import React, { useEffect, useState } from 'react'

interface Chore {
  id: number
  title: string
  points: number
}

interface Assignment {
  childId: number
  choreId: number
  status: string
}

const ChoreBoard: React.FC<{ childId: number }> = ({ childId }) => {
  const [chores, setChores] = useState<Chore[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    fetch('/chores').then(res => res.json()).then(setChores)
    fetch(`/kids/${childId}/assignments`).then(res => res.json()).then(setAssignments)
    fetch(`/kids/${childId}/points`).then(res => res.json()).then(data => setPoints(data.points))
  }, [childId])

  const complete = (a: Assignment) => {
    fetch('/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId: a.childId, choreId: a.choreId })
    }).then(() => {
      setAssignments(assignments.map(x => x.choreId === a.choreId ? { ...x, status: 'completed' } : x))
    })
  }

  return (
    <div className="board">
      <div className="points">Points: {points}</div>
      {assignments.map(a => {
        const chore = chores.find(c => c.id === a.choreId)
        return (
          <div key={a.choreId} className={`chore ${a.status}`}>
            <div className="title">{chore?.title}</div>
            <div className="points">+{chore?.points}</div>
            {a.status === 'pending' ? (
              <button onClick={() => complete(a)}>Done</button>
            ) : (
              <span className="status">{a.status}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChoreBoard
