import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Calculator from './components/Calculator'
import History from './components/History'
import './assets/styles/app.scss'

export default function App() {
  const [history, setHistory] = useState<string[]>([])

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Calculator history={history} setHistory={setHistory} />} />
          <Route
            path='/history'
            element={
              <div className='layout'>
                <Calculator history={history} setHistory={setHistory} />
                <History history={history} setHistory={setHistory} />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}
