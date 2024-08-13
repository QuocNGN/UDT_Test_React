import { TbPlusMinus } from 'react-icons/tb'

function Calculator() {
  return (
    <div className='calculator'>
      <div className='icon-wrapper'>
        <button className='icon Red'></button>
        <button className='icon Yellow'></button>
        <button className='icon Blue'></button>
      </div>
      <div className='output'>
        <div className='prev'>0</div>
        <div className='curr'>0</div>
      </div>

      <button className='button-top'>AC</button>
      <button className='button-top'>
        <TbPlusMinus />
      </button>
      <button className='button-top'>%</button>
      <button className='button-operator'>÷</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='button-operator'>x</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button className='button-operator'>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button className='button-operator'>+</button>
      <button className='button-zero'>0</button>
      <button>,</button>
      <button className='button-operator'>=</button>
    </div>
  )
}

export default Calculator
