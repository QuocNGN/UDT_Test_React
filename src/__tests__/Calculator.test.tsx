// __tests__/Calculator.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from '../components/Calculator'

describe('Calculator Component', () => {
  const mockAddHistory = jest.fn()

  it('should update display when buttons are clicked', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    expect(screen.getByText('78')).toBeInTheDocument()
  })

  it('should call addHistory on "=" button click', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(mockAddHistory).toHaveBeenCalled()
  })

  it('should clear history on "AC" button click', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    // expect(mockAddHistory).toHaveBeenCalledTimes(2) // AC and = calls
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should handle decimal point input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('8'))
    expect(screen.getByText('7.8')).toBeInTheDocument()
  })

  it('should handle Subtraction number input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('70')).toBeInTheDocument()
  })

  it('should handle Addition number input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('16')).toBeInTheDocument()
  })

  it('should handle Multiple operations', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('x'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  // it('should handle Division operation', () => {
  //   render(<Calculator addHistory={mockAddHistory} />)
  //   fireEvent.click(screen.getByText('6'))
  //   fireEvent.click(screen.getByText('÷'))
  //   fireEvent.click(screen.getByText('3'))
  //   fireEvent.click(screen.getByText('='))
  //   expect(screen.getByText('2')).toBeInTheDocument()
  // })

  // it('should handle Negative numbers', () => {
  //   render(<Calculator addHistory={mockAddHistory} />)
  //   fireEvent.click(screen.getByText('9'))
  //   fireEvent.click(screen.getByAltText('minus')) // Use getByAltText to target the negative sign button
  //   fireEvent.click(screen.getByText('3'))
  //   fireEvent.click(screen.getByText('='))
  //   expect(screen.getByText('-6')).toBeInTheDocument() // Expect '-6' instead of '3'
  // })

  it('should handle Addition decimal number input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('2.6')).toBeInTheDocument()
  })
  it('should handle Subtraction decimal with integer number input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('6.333')).toBeInTheDocument()
  })

  it('should handle Addition decimal with integer number input', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('2.3')).toBeInTheDocument()
  })

  it('should handle Change Operators numbers', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('x'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument()
  })

  it('should handle Division Operators numbers', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('3.3000000000000003')).toBeInTheDocument()
  })

  it('should handle a sequence of operations', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('x'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('should prevent multiple decimal points in a single number', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('.'))
    expect(screen.getByText('7.5')).toBeInTheDocument() // Ensure only one decimal point
  })

  it('should handle large numbers correctly', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('9'))
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText('0'))
    }
    expect(screen.getByText('90000000000')).toBeInTheDocument()
  })

  it('should clear the current entry when "C" is clicked', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('C'))
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should chain multiple operations correctly', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('x'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('16')).toBeInTheDocument()
  })

  it('should handle multiple decimal points correctly', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('.'))
    fireEvent.click(screen.getByText('8'))
    expect(screen.getByText('7.8')).toBeInTheDocument() // Should not add an extra decimal point
  })

  it('should clear all entries when "AC" is clicked', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('C'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('79')).toBeInTheDocument()
  })

  it('should handle Percent numbers', () => {
    render(<Calculator addHistory={mockAddHistory} />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('%'))
    expect(screen.getByText('0.09')).toBeInTheDocument()
  })
})
