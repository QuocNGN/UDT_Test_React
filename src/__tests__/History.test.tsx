// __tests__/History.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import History from '../components/History'
import { HistoryEntry } from '../App'

describe('History Component', () => {
  const mockClearHistory = jest.fn()

  it('should render history items', () => {
    const historyEntries: HistoryEntry[] = [
      { expression: '1 + 1', result: '2' },
      { expression: '2 x 2', result: '4' }
    ]
    render(<History history={historyEntries} clearHistory={mockClearHistory} />)
    expect(screen.getByText('1 + 1 = 2')).toBeInTheDocument()
    expect(screen.getByText('2 x 2 = 4')).toBeInTheDocument()
  })

  it('should call clearHistory on clear button click', () => {
    render(<History history={[]} clearHistory={mockClearHistory} />)
    fireEvent.click(screen.getByText('Clear'))
    expect(mockClearHistory).toHaveBeenCalled()
  })
})
