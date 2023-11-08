import React, { useState } from 'react'
import './App.css'
import fetchApi from './utils/fetchApi'
import Card from './components/Card'

function App() {
  const [hand, setHand] = useState([
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
  ])
  const [handClass, setHandClass] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="App">
      <h1>Poker hand analyzer</h1>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchApi('/api/analysis?hand=' + hand.flat().join(''))
            .then((response) => {
              setErrorMessage('')
              setHandClass(response.data.analysis)
            })
            .catch((err) => {
              console.error('Err:', err)
              setErrorMessage(err.errorMessage)
            })
        }}
      >
        <div>
          <Card idx={0} hand={hand} setHand={setHand} />
          <Card idx={1} hand={hand} setHand={setHand} />
          <Card idx={2} hand={hand} setHand={setHand} />
          <Card idx={3} hand={hand} setHand={setHand} />
          <Card idx={4} hand={hand} setHand={setHand} />
        </div>
        <button type="submit">Analyze hand</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchApi('/api/hand')
            .then((response) => {
              setErrorMessage('')
              const hand = response.data.hand
              setHand(hand)
            })
            .catch((err) => {
              console.error('Err:', err)
              setErrorMessage(err.errorMessage)
            })
        }}
      >
        <button type="submit">Get random hand</button>
      </form>
      {handClass}
    </div>
  )
}

export default App
