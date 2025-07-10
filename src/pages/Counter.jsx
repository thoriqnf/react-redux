import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  setIncrementAmount,
  reset,
  clearHistory,
  selectCount,
  selectIncrementAmount,
  selectHistory,
} from "../features/counter/counterSlice";

function Counter() {
  const count = useSelector(selectCount);
  const incrementAmount = useSelector(selectIncrementAmount);
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();

  const [customAmount, setCustomAmount] = useState("");

  const handleCustomIncrement = () => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount !== 0) {
      dispatch(incrementByAmount(amount));
      setCustomAmount("");
    }
  };

  const handleSetIncrementAmount = (e) => {
    const amount = parseInt(e.target.value);
    if (!isNaN(amount) && amount > 0) {
      dispatch(setIncrementAmount(amount));
    }
  };

  return (
    <div className="counter-container">
      <h1>Redux Counter</h1>

      <div className="counter-display">
        <h2>{count}</h2>
      </div>

      <div className="counter-controls">
        <button onClick={() => dispatch(increment())}>+ Increment</button>
        <button onClick={() => dispatch(decrement())}>- Decrement</button>
        <button onClick={() => dispatch(reset())}>🔄 Reset</button>
      </div>

      <div className="increment-amount-controls">
        <h3>Configure Default Increment</h3>
        <label>
          Default increment amount:
          <input
            type="number"
            value={incrementAmount}
            onChange={handleSetIncrementAmount}
            min="1"
            max="100"
          />
        </label>
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Add {incrementAmount}
        </button>
      </div>

      <div className="custom-increment">
        <h3>Custom Increment Amount</h3>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleCustomIncrement}>Add Custom Amount</button>
      </div>

      <div className="history-section">
        <div className="history-header">
          <h3>Action History</h3>
          <button onClick={() => dispatch(clearHistory())}>
            Clear History
          </button>
        </div>

        <div className="history-list">
          {history.length === 0 ? (
            <p>No actions performed yet. Try clicking the buttons above!</p>
          ) : (
            history
              .slice(-10)
              .reverse()
              .map((entry, index) => (
                <div key={index} className="history-item">
                  <span className="action">{entry.action}</span>
                  {entry.amount && (
                    <span className="amount">(+{entry.amount})</span>
                  )}
                  <span className="value">→ {entry.value}</span>
                  <span className="timestamp">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Counter;
