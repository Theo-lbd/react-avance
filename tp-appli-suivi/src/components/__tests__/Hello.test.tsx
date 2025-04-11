import { render, screen } from '@testing-library/react'

const Hello = () => <h1>Hello World</h1>

test('affiche Hello World', () => {
  render(<Hello />)
  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
})
