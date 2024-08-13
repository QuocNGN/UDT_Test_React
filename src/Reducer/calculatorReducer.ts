interface solveProps {
  symbol: string
  value: string
}

export interface actionProps {
  type:
    | '[Calculator] Add'
    | '[Calculator] Delete One'
    | '[Calculator] Remove All'
    | '[Calculator] Solve'
    | '[Calculator] Percentage'
    | '[Calculator] Toggle Sign'
  payload?: solveProps | string | undefined
}

const addNumber = (state: Array<string>, action: actionProps) => {
  if (state[0] === '0') return [action.payload]
  if (state.includes('.') && action.payload === '.') return state
  return [...state, action.payload]
}

const deleteOne = (state: Array<string>) => {
  if (state.length === 1) return ['0']
  return state.slice(0, -1)
}

const applyPercentage = (state: Array<string>) => {
  const currentValue = parseFloat(state.join(''))
  return [(currentValue / 100).toString()]
}

const toggleSign = (state: Array<string>) => {
  const currentValue = parseFloat(state.join(''))
  return [(-currentValue).toString()]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const solveOperation = (state: Array<string>, { payload }: any) => {
  const currentValue = parseFloat(state.join(''))
  const inputValue = parseFloat(payload.value)

  if (payload.symbol === '+') return [inputValue + currentValue]

  if (payload.symbol === '-') return [inputValue - currentValue]

  if (payload.symbol === 'x') return [inputValue * currentValue]

  if (payload.symbol === '÷') {
    if (currentValue === 0) return ['Cannot divide by zero']
    return [inputValue / currentValue]
  }

  return state
}

export const calcReducer = (state: Array<string>, action: actionProps) => {
  switch (action.type) {
    case '[Calculator] Add':
      return addNumber(state, action)

    case '[Calculator] Delete One':
      return deleteOne(state)

    case '[Calculator] Remove All':
      return ['0']

    case '[Calculator] Solve':
      return solveOperation(state, action)

    case '[Calculator] Percentage':
      return applyPercentage(state)

    case '[Calculator] Toggle Sign':
      return toggleSign(state)

    default:
      return state
  }
}
