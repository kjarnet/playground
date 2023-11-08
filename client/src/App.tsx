import React, { useState } from 'react'
import './App.css'

const suits = [
  { name: '- Suit -', short: '' },
  { name: 'Spades', short: 's' },
  { name: 'Diamonds', short: 'd' },
  { name: 'Hearts', short: 'h' },
  { name: 'Clubs', short: 'c' },
]

const values = [
  { name: '1', short: '1' },
  { name: '2', short: '2' },
  { name: '3', short: '3' },
  { name: '4', short: '4' },
  { name: '5', short: '5' },
  { name: '6', short: '6' },
  { name: '7', short: '7' },
  { name: '8', short: '8' },
  { name: '9', short: '9' },
  { name: '10', short: 't' },
  { name: 'J', short: 'j' },
  { name: 'Q', short: 'q' },
  { name: 'K', short: 'k' },
  { name: 'A', short: 'a' },
]

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
  hand: string[][]
  setHand: React.Dispatch<string[][]>
}) {
  return (
    <>
      <select
        size={1}
        value={hand[idx][0]}
        onChange={(e) => {
          e.preventDefault()
          setHand([
            ...hand.slice(0, idx),
            [e.target.value, hand[idx][1]],
            ...hand.slice(idx + 1),
          ])
        }}
      >
        {suits.map((s) => (
          <option value={s.short}>{s.name}</option>
        ))}
      </select>
      <select
        size={1}
        value={hand[idx][1]}
        onChange={(e) => {
          e.preventDefault()
          setHand([
            ...hand.slice(0, idx),
            [hand[idx][0], e.target.value],
            ...hand.slice(idx + 1),
          ])
        }}
      >
        {values.map((s) => (
          <option value={s.short}>{s.name}</option>
        ))}
      </select>
    </>
  )
}

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
          fetchApi('/api/analysis?hand=' + hand.flat().join(''))
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
