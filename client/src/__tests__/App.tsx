import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders get hand button', () => {
  render(<App />)
  const getHandButton = screen.getByText(/get random hand/i)
  expect(getHandButton).toBeInTheDocument()
})
