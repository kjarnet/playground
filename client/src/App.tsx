import React, { useState } from 'react'
import './App.css'

function App() {
  const [hand, setHand] = useState([])
  const [handClass, setHandClass] = useState('')

  return (
    <div className="App">
      <p>Welcome to the poker hand analyzer</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch('/api/hand')
            .then(
              (x) => {
                console.log(x.statusText)
                return x.json()
              },
              (err) => {
                console.error('Error', err)
              }
            )
            .then((x) => {
              console.log(x)
              setHand(x.data.hand)
            })
        }}
      >
        <button>Get random hand</button>
        {hand.join()}
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetch('/api/analysis?hand=' + hand.join(''))
            .then(
              (x) => {
                console.log(x.statusText)
                return x.json()
              },
              (err) => {
                console.error('Error', err)
              }
            )
            .then((x) => {
              console.log(x)
              setHandClass(x.data.analysis)
            })
        }}
      >
        <button>Analyze hand</button>
        {handClass}
      </form>
    </div>
  )
}

export default App
