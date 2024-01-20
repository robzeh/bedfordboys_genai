import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="font-bold text-8xl">Welcome</h1>
      <div className="buttons mx-auto">
        <button className="mx-2">
          View Your Patients
        </button>
        <button>
          Add New Patient
        </button>
      </div>
    </>
  )
}

export default App
