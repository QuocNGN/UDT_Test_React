import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Calculator from '../components/Calculator'

const mockSetHistory = jest.fn()

const renderWithRouter = (component: JSX.Element) => {
  return render(<Router>{component}</Router>)
}

test('button clicks update calculation', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('7'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('7 = 7')).toBeInTheDocument()

  fireEvent.click(screen.getByText('+'))
  expect(screen.getByText('7+')).toBeInTheDocument()

  fireEvent.click(screen.getByText('3'))
  expect(screen.getByText('7+3')).toBeInTheDocument()
})

test('should Addition number', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))

  expect(screen.getByText('3+3 = 6')).toBeInTheDocument()
})

test('clear one number', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('7'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))

  fireEvent.click(screen.getByText('C'))
  expect(screen.getByText('Ans = 0')).toBeInTheDocument()
})

test('should Subtraction number', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('-'))
  fireEvent.click(screen.getByText('1'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('5-10 = -5')).toBeInTheDocument()
})

test('should Multiply number', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('x'))
  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('5*5 = 25')).toBeInTheDocument()
})

test('should Divide number', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('÷'))
  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('5/5 = 1')).toBeInTheDocument()
})

test('percentage button calculates percentage correctly', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('5'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('%'))
  expect(screen.getByText('50 % = 0.5')).toBeInTheDocument()
})

// test('toggle sign changes the sign of the number', () => {
//   renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

//   fireEvent.click(screen.getByText('5'))
//   fireEvent.click(screen.getByText('±'))
//   expect(screen.getByText('-5')).toBeInTheDocument()
// })

test('sequential operations work correctly', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('3+3 = 6')).toBeInTheDocument()

  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('6+2 = 8')).toBeInTheDocument()

  fireEvent.click(screen.getByText('x'))
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('8*2 = 16')).toBeInTheDocument()
})

test('divide by zero shows error message', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('7'))
  fireEvent.click(screen.getByText('÷'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument()
})

test('Two number percent Addition', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('%'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('%'))
  expect(screen.getByText('0.09+900 % = 9.09')).toBeInTheDocument()
})

test('Two number percent Addition and Multiply', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('%'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('0'))
  fireEvent.click(screen.getByText('%'))
  fireEvent.click(screen.getByText('x'))
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('9'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('9.09*99 = 899.91')).toBeInTheDocument()
})

test('multiple decimal points are handled correctly', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('.'))
  fireEvent.click(screen.getByText('.'))
  fireEvent.click(screen.getByText('3'))
  expect(screen.getByText('3.3')).toBeInTheDocument()
})

test('operator precedence is maintained', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('x'))
  fireEvent.click(screen.getByText('4'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('2+3*4 = 14')).toBeInTheDocument()
})

test('multiple operations in sequence', () => {
  renderWithRouter(<Calculator history={[]} setHistory={mockSetHistory} />)

  fireEvent.click(screen.getByText('1'))
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('x'))
  fireEvent.click(screen.getByText('3'))
  fireEvent.click(screen.getByText('-'))
  fireEvent.click(screen.getByText('4'))
  fireEvent.click(screen.getByText('÷'))
  fireEvent.click(screen.getByText('2'))
  fireEvent.click(screen.getByText('='))
  expect(screen.getByText('1+2*3-4/2 = 5')).toBeInTheDocument()
})
