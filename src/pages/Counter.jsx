import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  decrement,
  incrementByAmount,
  setIncrementAmount,
  reset,
  clearHistory,
  selectCount,
  selectIncrementAmount,
  selectHistory
} from '../features/counter/counterSlice'

/**
 * Counter Component - Comprehensive Redux Tutorial
 * 
 * This component demonstrates the complete Redux data flow:
 * 1. Reading state from the Redux store using useSelector
 * 2. Dispatching actions to update state using useDispatch
 * 3. Handling action payloads for dynamic data
 * 4. Working with multiple pieces of state simultaneously
 * 5. Component re-rendering when Redux state changes
 * 
 * @returns {JSX.Element} The Counter component with Redux integration
 */
function Counter() {
  // ========================================================================================
  // REDUX STATE MANAGEMENT
  // ========================================================================================
  
  /**
   * useSelector Hook - Reading State from Redux Store
   * 
   * The useSelector hook allows us to extract data from the Redux store state.
   * When the state changes, the component will automatically re-render.
   * 
   * Best Practice: Use selector functions for better code organization
   */
  const count = useSelector(selectCount)                    // Current counter value
  const incrementAmount = useSelector(selectIncrementAmount) // Default increment amount
  const history = useSelector(selectHistory)                // Action history array
  
  /**
   * useDispatch Hook - Sending Actions to Redux Store
   * 
   * The useDispatch hook returns a reference to the dispatch function
   * from the Redux store. We use it to dispatch actions.
   */
  const dispatch = useDispatch()
  
  // ========================================================================================
  // LOCAL COMPONENT STATE
  // ========================================================================================
  
  /**
   * Local State for Custom Increment Input
   * 
   * Note: Not all state needs to be in Redux! 
   * Use local state for UI-specific data that doesn't need to be shared.
   */
  const [customAmount, setCustomAmount] = useState('')

  // ========================================================================================
  // EVENT HANDLERS
  // ========================================================================================
  
  /**
   * Handle Custom Increment
   * 
   * This function demonstrates:
   * - Input validation before dispatching actions
   * - Dispatching actions with payload data
   * - Updating local state after action dispatch
   */
  const handleCustomIncrement = () => {
    const amount = parseInt(customAmount)
    if (!isNaN(amount) && amount !== 0) {
      // Dispatch the action with payload
      dispatch(incrementByAmount(amount))
      // Clear the input field
      setCustomAmount('')
    }
  }

  /**
   * Handle Setting Increment Amount
   * 
   * This demonstrates dispatching actions from event handlers
   * and working with form inputs in Redux applications.
   */
  const handleSetIncrementAmount = (e) => {
    const amount = parseInt(e.target.value)
    if (!isNaN(amount) && amount > 0) {
      dispatch(setIncrementAmount(amount))
    }
  }

  // ========================================================================================
  // RENDER COMPONENT
  // ========================================================================================
  
  return (
    <div className="counter-container">
      <h1>Redux Counter Tutorial</h1>
      
      {/* ================================================================================== */}
      {/* COUNTER DISPLAY - Shows current state from Redux store */}
      {/* ================================================================================== */}
      <div className="counter-display">
        <h2>{count}</h2>
      </div>
      
      {/* ================================================================================== */}
      {/* BASIC CONTROLS - Demonstrates simple action dispatching */}
      {/* ================================================================================== */}
      <div className="counter-controls">
        <button onClick={() => dispatch(increment())}>
          + Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          - Decrement
        </button>
        <button onClick={() => dispatch(reset())}>
          🔄 Reset
        </button>
      </div>
      
      {/* ================================================================================== */}
      {/* HOW IT WORKS SECTION - Educational explanation */}
      {/* ================================================================================== */}
      <div className="how-it-works">
        <h3>🔄 How Redux Data Flow Works</h3>
        <p>
          When you click a button above, here's what happens in Redux:
        </p>
        <ol>
          <li><strong>Action Dispatch:</strong> <code>dispatch(increment())</code> sends an action object to the store</li>
          <li><strong>Reducer Processing:</strong> The counterSlice reducer receives the action and updates the state</li>
          <li><strong>State Update:</strong> The store updates with the new state value</li>
          <li><strong>Component Re-render:</strong> <code>useSelector</code> detects the change and re-renders this component</li>
          <li><strong>UI Update:</strong> The new count value appears on screen</li>
        </ol>
        
        <div className="code-example">
          <pre>
{`// When you click increment, this happens:
const action = { type: 'counter/increment' }
dispatch(action)

// The reducer processes it:
state.value += 1  // Thanks to Redux Toolkit's Immer integration
state.history.push({ action: 'increment', value: state.value })

// Component re-renders with new state`}
          </pre>
        </div>
      </div>
      
      {/* ================================================================================== */}
      {/* ADVANCED CONTROLS - Shows action payloads and form handling */}
      {/* ================================================================================== */}
      <div className="increment-amount-controls">
        <h3>⚙️ Configure Default Increment</h3>
        <p>This demonstrates how to dispatch actions with payload data:</p>
        
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
        
        <div className="code-example">
          <pre>
{`// Action with payload:
dispatch(incrementByAmount(5))

// Creates this action object:
{
  type: 'counter/incrementByAmount',
  payload: 5
}

// Reducer uses the payload:
state.value += action.payload`}
          </pre>
        </div>
      </div>
      
      {/* ================================================================================== */}
      {/* CUSTOM INCREMENT - Shows input validation and local state */}
      {/* ================================================================================== */}
      <div className="custom-increment">
        <h3>🎯 Custom Increment Amount</h3>
        <p>Enter any number to increment by that amount:</p>
        
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleCustomIncrement}>
          Add Custom Amount
        </button>
        
        <div className="code-example">
          <pre>
{`// Local state for form input:
const [customAmount, setCustomAmount] = useState('')

// Input validation before dispatch:
const amount = parseInt(customAmount)
if (!isNaN(amount) && amount !== 0) {
  dispatch(incrementByAmount(amount))
}`}
          </pre>
        </div>
      </div>
      
      {/* ================================================================================== */}
      {/* ACTION HISTORY - Shows complex state and array management */}
      {/* ================================================================================== */}
      <div className="history-section">
        <div className="history-header">
          <h3>📊 Action History</h3>
          <button onClick={() => dispatch(clearHistory())}>
            Clear History
          </button>
        </div>
        
        <p>This shows how Redux can manage complex state like arrays and objects:</p>
        
        <div className="history-list">
          {history.length === 0 ? (
            <p>No actions performed yet. Try clicking the buttons above!</p>
          ) : (
            history.slice(-10).reverse().map((entry, index) => (
              <div key={index} className="history-item">
                <span className="action">{entry.action}</span>
                {entry.amount && <span className="amount">(+{entry.amount})</span>}
                <span className="value">→ {entry.value}</span>
                <span className="timestamp">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
        
        <div className="code-example">
          <pre>
{`// Each action adds to history array:
state.history.push({
  action: 'increment',
  value: state.value,
  timestamp: Date.now()
})

// Display last 10 actions, newest first:
history.slice(-10).reverse().map(...)`}
          </pre>
        </div>
      </div>
      
      {/* ================================================================================== */}
      {/* EDUCATIONAL NOTES - Key concepts and best practices */}
      {/* ================================================================================== */}
      <div className="educational-notes">
        <h3>📚 Key Redux Concepts Demonstrated</h3>
        <ul>
          <li><strong>useSelector:</strong> Reads state from Redux store. Component re-renders when selected state changes.</li>
          <li><strong>useDispatch:</strong> Gets dispatch function to send actions to the store.</li>
          <li><strong>Actions:</strong> Plain objects describing what happened (e.g., increment, decrement).</li>
          <li><strong>Reducers:</strong> Pure functions that specify how state changes in response to actions.</li>
          <li><strong>Payload:</strong> Data passed with actions (e.g., <code>incrementByAmount(5)</code>).</li>
          <li><strong>Immutability:</strong> Redux Toolkit uses Immer, so we can write "mutating" logic that's actually immutable.</li>
          <li><strong>State Structure:</strong> Our counter has <code>value</code>, <code>incrementAmount</code>, and <code>history</code> properties.</li>
          <li><strong>Selectors:</strong> Functions that extract specific pieces of state (e.g., <code>selectCount</code>).</li>
        </ul>
        
        <h3>🎯 Best Practices Shown</h3>
        <ul>
          <li><strong>Separate Concerns:</strong> Redux for global state, local state for UI-specific data.</li>
          <li><strong>Input Validation:</strong> Validate data before dispatching actions.</li>
          <li><strong>Descriptive Actions:</strong> Use clear action names like <code>incrementByAmount</code>.</li>
          <li><strong>Selector Functions:</strong> Use <code>selectCount</code> instead of <code>state =&gt; state.counter.value</code>.</li>
          <li><strong>History Tracking:</strong> Store action history for debugging and user feedback.</li>
        </ul>
        
        <h3>🔍 Try This</h3>
        <ul>
          <li>Open Redux DevTools in your browser to see actions being dispatched</li>
          <li>Try clicking buttons rapidly to see how Redux handles multiple state updates</li>
          <li>Change the increment amount and see how it affects the "Add X" button</li>
          <li>Notice how the history updates in real-time as you perform actions</li>
        </ul>
      </div>
      
      {/* ================================================================================== */}
      {/* REDUX DEVTOOLS SECTION */}
      {/* ================================================================================== */}
      <div className="how-it-works">
        <h3>🛠️ Using Redux DevTools</h3>
        <p>
          Redux DevTools is a powerful browser extension that lets you inspect and debug Redux state changes.
        </p>
        <ol>
          <li>Install the Redux DevTools Extension in your browser</li>
          <li>Open Developer Tools (F12) and look for the "Redux" tab</li>
          <li>Click buttons in this counter and watch the actions appear in DevTools</li>
          <li>You can "time travel" by clicking on previous actions to see how state looked</li>
          <li>The "State" tab shows the current Redux store state</li>
        </ol>
        
        <div className="code-example">
          <pre>
{`// Redux DevTools shows:
Action: { type: 'counter/increment' }
Prev State: { value: 5, incrementAmount: 1, history: [...] }
Next State: { value: 6, incrementAmount: 1, history: [...] }`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Counter