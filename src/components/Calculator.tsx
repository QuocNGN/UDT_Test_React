/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TbPlusMinus } from 'react-icons/tb'
import React, { useReducer, useEffect } from 'react'
import { calculatorReducer, initialState } from '../Reducer/calculatorReducer'
import { GoHistory } from 'react-icons/go'
import { useNavigate, useLocation } from 'react-router-dom'

interface CalculatorProps {
  history: string[]
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calculator: React.FC<CalculatorProps> = ({ history, setHistory }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (
      state.result !== 'Ans = 0' &&
      state.result !== 'Cannot divide by zero' &&
      state.result !== 'Infinity' &&
      state.result !== 'Error'
    ) {
      setHistory((prevHistory) => [...prevHistory, state.result])
    }
  }, [state.result, setHistory])

  const handleClick = (char: string) => {
    // Giới hạn phép toán đến 26 ký tự
    if (state.calculation.length < 26 && !state.error) {
      dispatch({ type: 'ADD_CHAR', payload: char })
    }
  }

  const handlePercentage = () => {
    dispatch({ type: 'PERCENTAGE' })
  }

  const handleToggleSign = () => {
    dispatch({ type: 'TOGGLE_SIGN' })
  }

  const handleClear = () => {
    if (state.error || state.calculation.length <= 1) {
      dispatch({ type: 'CLEAR' })
    } else {
      dispatch({ type: 'DELETE_LAST' })
    }
  }

  const handleEvaluate = () => {
    if (!state.error && state.calculation.length > 0) {
      dispatch({ type: 'EVALUATE' })
    }
  }

  const handleHistoryNavigation = () => {
    if (location.pathname === '/') {
      navigate('/history')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='calculator'>
      <div className='icon-wrapper'>
        <div className='icon'>
          <button className='icon Red'></button>
          <button className='icon Yellow'></button>
          <button className='icon Blue'></button>
        </div>

        <div className='history-btn' role='button' tabIndex={0} onClick={handleHistoryNavigation}>
          <GoHistory />
        </div>
      </div>
      <div className='output-box'>
        <div className='result-box'>
          <span id='answer'>{state.result}</span>
        </div>
        <div className='input-box'>
          <span id='calculation' className={state.calculation.length > 15 ? 'small-text' : ''}>
            {state.calculation}
          </span>
        </div>
      </div>

      <button onClick={handleClear} className='button-top'>
        {state.error || state.calculation.length > 1 ? 'C' : 'AC'}
      </button>
      <button onClick={handleToggleSign} className='button-top'>
        <TbPlusMinus />
      </button>
      <button onClick={handlePercentage} className='button-top'>
        %
      </button>
      <button onClick={() => handleClick('/')} className='button-operator'>
        ÷
      </button>
      <button onClick={() => handleClick('7')}>7</button>
      <button onClick={() => handleClick('8')}>8</button>
      <button onClick={() => handleClick('9')}>9</button>
      <button onClick={() => handleClick('*')} className='button-operator'>
        x
      </button>
      <button onClick={() => handleClick('4')}>4</button>
      <button onClick={() => handleClick('5')}>5</button>
      <button onClick={() => handleClick('6')}>6</button>
      <button onClick={() => handleClick('-')} className='button-operator'>
        -
      </button>
      <button onClick={() => handleClick('1')}>1</button>
      <button onClick={() => handleClick('2')}>2</button>
      <button onClick={() => handleClick('3')}>3</button>
      <button onClick={() => handleClick('+')} className='button-operator'>
        +
      </button>
      <button onClick={() => handleClick('0')} className='button-zero'>
        0
      </button>
      <button onClick={() => handleClick('.')}>.</button>
      <button onClick={handleEvaluate} className='button-operator'>
        =
      </button>
    </div>
  )
}

export default Calculator
