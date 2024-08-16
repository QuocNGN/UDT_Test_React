import { render, screen, fireEvent } from '@testing-library/react'
import History from '../components/History'

test('renders history with no entries', () => {
  render(<History history={[]} setHistory={jest.fn()} />)
  expect(screen.getByText('No history yet')).toBeInTheDocument()
})

test('renders history entries correctly', () => {
  const history = ['3+3=6', '6+2=8']
  render(<History history={history} setHistory={jest.fn()} />)
  expect(screen.getByText('3+3=6')).toBeInTheDocument()
  expect(screen.getByText('6+2=8')).toBeInTheDocument()
})

test('clears history on button click', () => {
  const setHistory = jest.fn()
  render(<History history={['3+3=6']} setHistory={setHistory} />)

  fireEvent.click(screen.getByText('Clear History'))
  expect(setHistory).toHaveBeenCalledWith([])
})
