import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Calculator from './components/Calculator'
import History from './components/History'
import './assets/styles/app.scss'

export interface HistoryEntry {
  expression: string
  result: string
}

export default function App() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    return JSON.parse(localStorage.getItem('calcHistory') || '[]')
  })

  const addHistory = (entry: HistoryEntry) => {
    const updatedHistory = [...history, entry]
    setHistory(updatedHistory)
    localStorage.setItem('calcHistory', JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('calcHistory')
  }

  return (
    <div className='App'>
      <Router>
        {' '}
        {/* Đảm bảo Router chỉ xuất hiện một lần */}
        <Routes>
          <Route path='/' element={<Calculator addHistory={addHistory} />} />
          <Route
            path='/history'
            element={
              <div className='layout'>
                <Calculator addHistory={addHistory} />
                <History history={history} clearHistory={clearHistory} />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}
