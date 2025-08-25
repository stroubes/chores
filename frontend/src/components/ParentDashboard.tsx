import React, { useEffect, useState } from 'react'

interface Kid {
  id: number
  name: string
}

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

const ParentDashboard: React.FC = () => {
  const [kids, setKids] = useState<Kid[]>([])
  const [chores, setChores] = useState<Chore[]>([])
  const [newKid, setNewKid] = useState('')
  const [newChore, setNewChore] = useState('')
  const [chorePoints, setChorePoints] = useState(0)
  const [assignKid, setAssignKid] = useState<number>()
  const [assignChore, setAssignChore] = useState<number>()
  const [rewardName, setRewardName] = useState('')
  const [rewardCost, setRewardCost] = useState(0)

  useEffect(() => {
    fetch('/kids').then(res => res.json()).then(setKids)
    fetch('/chores').then(res => res.json()).then(setChores)
  }, [])

  const refresh = () => {
    fetch('/kids').then(res => res.json()).then(setKids)
    fetch('/chores').then(res => res.json()).then(setChores)
  }

  const addKid = () => {
    const id = Date.now()
    fetch('/kids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: newKid, role: 'child' })
    }).then(() => { setNewKid(''); refresh(); })
  }

  const addChore = () => {
    const id = Date.now()
    fetch('/chores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: newChore, points: chorePoints })
    }).then(() => { setNewChore(''); setChorePoints(0); refresh(); })
  }

  const assign = () => {
    if (!assignKid || !assignChore) return
    fetch('/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId: assignKid, choreId: assignChore })
    }).then(() => refresh())
  }

  const addReward = () => {
    const id = Date.now()
    fetch('/rewards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: rewardName, cost: rewardCost })
    }).then(() => { setRewardName(''); setRewardCost(0); })
  }

  const approve = (childId: number, choreId: number) => {
    fetch('/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childId, choreId })
    }).then(() => refresh())
  }

  return (
    <div className="parent">
      <h2>Parent Dashboard</h2>
      <div className="forms">
        <div>
          <h3>Add Kid</h3>
          <input value={newKid} onChange={e => setNewKid(e.target.value)} placeholder="Name" />
          <button onClick={addKid}>Add</button>
        </div>
        <div>
          <h3>Add Chore</h3>
          <input value={newChore} onChange={e => setNewChore(e.target.value)} placeholder="Title" />
          <input type="number" value={chorePoints} onChange={e => setChorePoints(parseInt(e.target.value))} placeholder="Points" />
          <button onClick={addChore}>Add</button>
        </div>
        <div>
          <h3>Assign Chore</h3>
          <select value={assignKid} onChange={e => setAssignKid(parseInt(e.target.value))}>
            <option value="">Kid</option>
            {kids.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
          </select>
          <select value={assignChore} onChange={e => setAssignChore(parseInt(e.target.value))}>
            <option value="">Chore</option>
            {chores.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <button onClick={assign}>Assign</button>
        </div>
        <div>
          <h3>Add Reward</h3>
          <input value={rewardName} onChange={e => setRewardName(e.target.value)} placeholder="Name" />
          <input type="number" value={rewardCost} onChange={e => setRewardCost(parseInt(e.target.value))} placeholder="Cost" />
          <button onClick={addReward}>Add</button>
        </div>
      </div>
      {kids.map(kid => (
        <KidBlock key={kid.id} kid={kid} chores={chores} approve={approve} />
      ))}
    </div>
  )
}

const KidBlock: React.FC<{ kid: Kid; chores: Chore[]; approve: (c: number, ch: number) => void }> = ({ kid, chores, approve }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  useEffect(() => {
    fetch(`/kids/${kid.id}/assignments`).then(res => res.json()).then(setAssignments)
  }, [kid.id])
  return (
    <div className="kid-block">
      <h3>{kid.name}</h3>
      {assignments.map(a => {
        const chore = chores.find(c => c.id === a.choreId)
        return (
          <div key={a.choreId} className={`chore ${a.status}`}>
            <span>{chore?.title}</span>
            {a.status === 'completed' ? (
              <button onClick={() => approve(a.childId, a.choreId)}>Approve</button>
            ) : (
              <span className="status">{a.status}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ParentDashboard
