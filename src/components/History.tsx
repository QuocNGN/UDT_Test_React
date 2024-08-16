import React from 'react'

interface HistoryProps {
  history: string[]
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
}

const History: React.FC<HistoryProps> = ({ history, setHistory }) => {
  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <div className='history'>
      <h2>History</h2>
      <ul>
        {history.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <li>No history yet</li>
        )}
      </ul>
      <button className='button-clear' onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
  )
}

export default History
