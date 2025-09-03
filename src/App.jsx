import { useState } from 'react'
import './App.css'
import RockPaperScissors from './RockPaperScissors'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RockPaperScissors />
    </>
  )
}

export default App
