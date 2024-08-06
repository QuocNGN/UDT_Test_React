import '../assets/styles/app.scss'
import { TbPlusMinus } from 'react-icons/tb'
import { LuDivide } from 'react-icons/lu'
import { HiMiniXMark } from 'react-icons/hi2'

export default function Buttons() {
  return (
    <div className='buttons-container'>
      {/* row of buttons */}
      <div className='button-row'>
        <button className='top'>AC</button>
        <button className='top'>
          {/* +/- */}
          <TbPlusMinus />
        </button>
        <button className='top'>%</button>
        <button className='last-button'>
          {/* ÷ */}
          <LuDivide />
        </button>
      </div>
      <div className='button-row'>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className='last-button'>
          {/* ✕ */}
          <HiMiniXMark />
        </button>
      </div>
      <div className='button-row'>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className='last-button'>-</button>
      </div>
      <div className='button-row'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className='last-button'>+</button>
      </div>
      <div className='button-row'>
        <button className='zero-btn'>0</button>
        <button className='decimal-btn'>.</button>
        <button className='last-button equal-sign-btn'>=</button>
      </div>
    </div>
  )
}
