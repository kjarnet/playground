import React from 'react'
import { render, screen } from '@testing-library/react'
import Card from '../Card'

test('renders card inputs with correct values', () => {
  render(
    <Card
      idx={1}
      hand={[
        ['s', '2'],
        ['d', '3'],
        ['h', '4'],
        ['c', '5'],
        ['s', '6'],
      ]}
      setHand={() => {}}
    />
  )

  const suitSelect = screen.getByTitle(/card suit/i)
  expect(suitSelect).toBeInTheDocument()
  expect(suitSelect).toHaveValue('d')
  const valueSelect = screen.getByTitle(/card value/i)
  expect(valueSelect).toBeInTheDocument()
  expect(valueSelect).toHaveValue('3')
})
