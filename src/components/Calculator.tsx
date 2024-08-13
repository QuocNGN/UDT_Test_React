import { TbPlusMinus } from 'react-icons/tb'
import { Reducer, useReducer, useState } from 'react'
import { actionProps, calcReducer, solveOperation } from '../Reducer/calculatorReducer'
import { HistoryEntry } from '../App'

const initialState: Array<string> = ['0']

const operatorInit = {
  symbol: '',
  value: ''
}

export default function Calculator({ addHistory }: { addHistory: (entry: HistoryEntry) => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, dispatch] = useReducer<Reducer<any, actionProps>>(calcReducer, initialState)
  const [operator, setOperator] = useState(operatorInit)
  const [buttonText, setButtonText] = useState('AC')

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: '[Calculator] Add',
      payload: e.currentTarget.innerHTML
    })
    setButtonText('C')
  }

  const handleRemove = () => {
    if (buttonText === 'AC') {
      dispatch({
        type: '[Calculator] Remove All'
      })
      setOperator(operatorInit)
      setButtonText('AC')
    } else {
      dispatch({
        type: '[Calculator] Delete One'
      })
      setButtonText(state.length === 1 && state[0] === '0' ? 'AC' : 'C')
    }
  }

  const handleSolve = () => {
    dispatch({
      type: '[Calculator] Solve',
      payload: operator
    })

    const expression = `${operator.value} ${operator.symbol} ${state.join('')}`
    const result = solveOperation(state, { payload: operator }).join('')

    addHistory({ expression, result })

    setOperator(operatorInit)
    setButtonText('AC')
  }

  const setOperation = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    const currentState = state.join('')

    switch (true) {
      case currentState === '0' && operator.value.length === 0:
        break

      case currentState === '0' && operator.value.length > 0:
        setOperator((v) => ({ ...v, symbol: currentTarget.innerHTML }))
        setButtonText('C')
        break

      case currentState !== '0' && operator.value.length === 0:
        setOperator({ symbol: currentTarget.innerHTML, value: currentState })
        dispatch({
          type: '[Calculator] Remove All'
        })
        setButtonText('C')
        break

      case currentState !== '0' && operator.value.length > 0:
        dispatch({
          type: '[Calculator] Remove All'
        })

        // eslint-disable-next-line no-case-declarations
        const newValue = solveOperation(state, {
          payload: {
            symbol: operator.symbol,
            value: operator.value
          }
        })

        setOperator({
          symbol: currentTarget.innerHTML,
          value: newValue.join('')
        })
        setButtonText('C')
        break

      default:
        throw new Error('Uncaught Exception')
    }
  }

  const handlePercentage = () => {
    dispatch({ type: '[Calculator] Percentage' })
    setButtonText('C')
  }

  const handleToggleSign = () => {
    dispatch({ type: '[Calculator] Toggle Sign' })
    setButtonText('C')
  }

  return (
    <div className='calculator'>
      <div className='icon-wrapper'>
        <button className='icon Red'></button>
        <button className='icon Yellow'></button>
        <button className='icon Blue'></button>
      </div>
      <div className='output'>
        <div className='prev'>
          {operator.value} {operator.symbol}
        </div>
        <div className='curr'>{state}</div>
      </div>

      <button onClick={handleRemove} className='button-top'>
        {buttonText}
      </button>
      <button onClick={handleToggleSign} className='button-top'>
        <TbPlusMinus />
      </button>
      <button onClick={handlePercentage} className='button-top'>
        %
      </button>
      <button onClick={setOperation} className='button-operator'>
        ÷
      </button>
      <button onClick={handleAdd}>7</button>
      <button onClick={handleAdd}>8</button>
      <button onClick={handleAdd}>9</button>
      <button onClick={setOperation} className='button-operator'>
        x
      </button>
      <button onClick={handleAdd}>4</button>
      <button onClick={handleAdd}>5</button>
      <button onClick={handleAdd}>6</button>
      <button onClick={setOperation} className='button-operator'>
        -
      </button>
      <button onClick={handleAdd}>1</button>
      <button onClick={handleAdd}>2</button>
      <button onClick={handleAdd}>3</button>
      <button onClick={setOperation} className='button-operator'>
        +
      </button>
      <button onClick={handleAdd} className='button-zero'>
        0
      </button>
      <button onClick={handleAdd}>.</button>
      <button onClick={handleSolve} className='button-operator'>
        =
      </button>
    </div>
  )
}
