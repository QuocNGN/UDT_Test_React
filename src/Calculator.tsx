import './assets/styles/app.scss'
import Input from './components/Input'
import Buttons from './components/Buttons'

export default function Calculator() {
  return (
    <div className='calculator-container'>
      <Input />
      <Buttons />
    </div>
  )
}
