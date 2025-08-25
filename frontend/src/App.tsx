import React, { useEffect, useState } from 'react'
import ChoreBoard from './components/ChoreBoard'
import ParentDashboard from './components/ParentDashboard'

interface Kid { id: number; name: string }

const App: React.FC = () => {
  const [view, setView] = useState<'child' | 'login' | 'parent'>('child')
  const [kids, setKids] = useState<Kid[]>([])
  const [childId, setChildId] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('/kids').then(res => res.json()).then(setKids)
  }, [])

  if (view === 'parent') {
    return <ParentDashboard />
  }

  if (view === 'login') {
    return (
      <div className="app">
        <h1>Parent Login</h1>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => {
          if (username === 'parent' && password === 'secret') setView('parent')
        }}>Login</button>
        <button onClick={() => setView('child')}>Back</button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Chore Board</h1>
      <div className="child-selector">
        {kids.map(k => (
          <button key={k.id} onClick={() => setChildId(k.id)} className={childId === k.id ? 'active' : ''}>{k.name}</button>
        ))}
        <button onClick={() => setView('login')}>Parent</button>
      </div>
      <ChoreBoard childId={childId} />
    </div>
  )
}

export default App
