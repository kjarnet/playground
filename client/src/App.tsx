import React, { useState } from 'react'
import './App.css'

function fetchApi(url: string): Promise<any> {
  return fetch(url)
    .then((x) => {
      console.log(x.statusText)
      return x.json().then((data) => {
        if (x.ok) {
          return {
            ok: true,
            ...data,
          }
        } else {
          return {
            ok: false,
            ...data,
          }
        }
      })
    })
    .then((x) => {
      console.log(x)
      if (!x.ok) {
        throw x
      }
      return x
    })
}

function Card({
  idx,
  hand,
  setHand,
}: {
  idx: number
  hand: string[]
  setHand: React.Dispatch<string[]>
}) {
  return (
    <input
      type="text"
      maxLength={2}
      size={2}
      value={hand[idx]}
      onChange={(e) => {
        e.preventDefault()
        setHand([...hand.slice(0, idx), e.target.value, ...hand.slice(idx + 1)])
      }}
    />
  )
}

function App() {
  const [hand, setHand] = useState(['', '', '', '', ''])
  const [handClass, setHandClass] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="App">
      <p>Welcome to the poker hand analyzer</p>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchApi('/api/hand')
            .then((x) => {
              console.log(x)
              setErrorMessage('')
              const hand = x.data.hand
              setHand(hand)
            })
            .catch((err) => {
              console.error('Err:', err)
              setErrorMessage(err.errorMessage)
            })
        }}
      >
        <button>Get random hand</button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchApi('/api/analysis?hand=' + hand.join(''))
            .then((x) => {
              setErrorMessage('')
              setHandClass(x.data.analysis)
            })
            .catch((err) => {
              console.error('Err:', err)
              setErrorMessage(err.errorMessage)
            })
        }}
      >
        <Card idx={0} hand={hand} setHand={setHand} />
        <Card idx={1} hand={hand} setHand={setHand} />
        <Card idx={2} hand={hand} setHand={setHand} />
        <Card idx={3} hand={hand} setHand={setHand} />
        <Card idx={4} hand={hand} setHand={setHand} />
        <button>Analyze hand</button>
      </form>
      {handClass}
    </div>
  )
}

export default App
