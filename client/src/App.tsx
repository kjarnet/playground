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

function App() {
  const [hand, setHand] = useState([])
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
              setHand(x.data.hand)
            })
            .catch((err) => {
              console.error('Err:', err)
              setErrorMessage(err.errorMessage)
            })
        }}
      >
        <button>Get random hand</button>
      </form>
      {hand.join()}
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
        <button>Analyze hand</button>
      </form>
      {handClass}
    </div>
  )
}

export default App
