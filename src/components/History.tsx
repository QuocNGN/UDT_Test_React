import { HistoryEntry } from '../App'
import { FaTrash } from 'react-icons/fa'

const History = ({ history, clearHistory }: { history: HistoryEntry[]; clearHistory: () => void }) => {
  return (
    <div className='history'>
      <h1>History</h1>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.expression} = {entry.result}
          </li>
        ))}
      </ul>
      <button onClick={clearHistory} className='button-clear'>
        <FaTrash /> <span>Clear</span>
      </button>
    </div>
  )
}

export default History
