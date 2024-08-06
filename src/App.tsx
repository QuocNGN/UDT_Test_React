import React from 'react'
import Calculator from './Calculator'
// import './app.css';
export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='icon-wrapper'>
          <button className='icon Red'></button>
          <button className='icon Yellow'></button>
          <button className='icon Blue'></button>
        </div>
        <Calculator />
      </div>
    )
  }
}
