/* eslint-disable import/no-duplicates */
// calculatorReducer.test.ts
import { calculatorReducer, initialState } from '../Reducer/calculatorReducer'
import { Action } from '../Reducer/calculatorReducer'

describe('calculatorReducer', () => {
  // it('should handle ADD_CHAR action', () => {
  //   const action: Action = { type: 'ADD_CHAR', payload: '5' }
  //   const newState = calculatorReducer(initialState, action)
  //   expect(newState.calculation).toBe('0' + action.payload) // Test thêm ký tự
  // })

  it('should handle CLEAR action', () => {
    const action: Action = { type: 'CLEAR' }
    const newState = calculatorReducer({ ...initialState, calculation: '5+5', result: '10' }, action)
    expect(newState.calculation).toBe('0')
    expect(newState.result).toBe('Ans = 0')
  })

  it('should handle EVALUATE action', () => {
    const action: Action = { type: 'EVALUATE' }
    const newState = calculatorReducer({ ...initialState, calculation: '2+3' }, action)
    expect(newState.result).toBe('2+3 = 5')
    expect(newState.calculation).toBe('5')
  })

  it('should handle PERCENTAGE action', () => {
    const action: Action = { type: 'PERCENTAGE' }
    const newState = calculatorReducer({ ...initialState, calculation: '50' }, action)
    expect(newState.result).toBe('50 % = 0.5')
    expect(newState.calculation).toBe('0.5')
  })

  it('should handle TOGGLE_SIGN action', () => {
    const action: Action = { type: 'TOGGLE_SIGN' }
    const newState = calculatorReducer({ ...initialState, calculation: '5' }, action)
    expect(newState.result).toBe('5 ± = -5')
    expect(newState.calculation).toBe('-5')
  })

  it('should handle DELETE_LAST action', () => {
    const action: Action = { type: 'DELETE_LAST' }
    const newState = calculatorReducer({ ...initialState, calculation: '5+5' }, action)
    expect(newState.calculation).toBe('5+')
  })

  it('should handle SET_ERROR action', () => {
    const action: Action = { type: 'SET_ERROR', payload: true }
    const newState = calculatorReducer({ ...initialState, error: false }, action)
    expect(newState.error).toBe(true)
  })

  it('should handle error cases correctly', () => {
    const divideByZeroState = calculatorReducer({ ...initialState, calculation: '1/0' }, { type: 'EVALUATE' })
    expect(divideByZeroState.result).toBe('Cannot divide by zero')
    expect(divideByZeroState.error).toBe(true)
  })

  it('should handle unknown action types', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action: Action = { type: 'UNKNOWN_ACTION' as any }
    const newState = calculatorReducer(initialState, action)
    expect(newState).toEqual(initialState) // Trả về state không thay đổi
  })
})
