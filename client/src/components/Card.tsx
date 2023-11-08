import React from 'react'

const suits = [
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
        name="cardSuit"
        title="Card Suit"
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
        <option value=""> - Suit - </option>
        {suits.map((s) => (
          <option key={s.short} value={s.short}>
            {s.name}
          </option>
        ))}
      </select>
      <select
        name="cardValue"
        title="Card Value"
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
        <option value=""></option>
        {values.map((s) => (
          <option key={s.short} value={s.short}>
            {s.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default Card
