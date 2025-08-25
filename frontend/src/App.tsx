import React from 'react'
import ChoreBoard from './components/ChoreBoard'

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Chore Board</h1>
      <ChoreBoard childId={1} />
    </div>
  )
}

export default App
