import { useState } from 'react'
import useCounterStore from '../stores/counterStore'

// Simple Counter Component - demonstrates basic Zustand usage
const SimpleCounter = () => {
  // Subscribe to the store - component will re-render when count changes
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)
  const incrementBy = useCounterStore((state) => state.incrementBy)
  
  // You can also destructure multiple values (but this causes re-renders on any change)
  // const { count, increment, decrement, reset } = useCounterStore()
  
  return (
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px', margin: '10px 0', backgroundColor: '#2d2d2d' }}>
      <h3 style={{ color: '#ffffff' }}>Simple Counter</h3>
      <p style={{ color: '#ccc' }}>Count: <strong style={{ color: '#ffffff' }}>{count}</strong></p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={() => incrementBy(5)}>+5</button>
        <button onClick={() => incrementBy(-5)}>-5</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

// Multiple Counters Component - demonstrates working with object state
const MultipleCounters = () => {
  const [counterId, setCounterId] = useState('')
  
  // Subscribe to specific parts of the store
  const counters = useCounterStore((state) => state.counters)
  const createCounter = useCounterStore((state) => state.createCounter)
  const updateCounter = useCounterStore((state) => state.updateCounter)
  const removeCounter = useCounterStore((state) => state.removeCounter)
  
  const handleCreateCounter = () => {
    if (counterId.trim()) {
      createCounter(counterId.trim())
      setCounterId('')
    }
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px', margin: '10px 0', backgroundColor: '#2d2d2d' }}>
      <h3 style={{ color: '#ffffff' }}>Multiple Counters</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={counterId}
          onChange={(e) => setCounterId(e.target.value)}
          placeholder="Counter ID"
          style={{ padding: '8px', marginRight: '10px', backgroundColor: '#1a1a1a', color: '#ffffff', border: '1px solid #444' }}
        />
        <button onClick={handleCreateCounter}>Create Counter</button>
      </div>
      
      {Object.entries(counters).map(([id, counter]) => (
        <div key={id} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          padding: '10px',
          backgroundColor: '#1a1a1a',
          borderRadius: '4px',
          margin: '5px 0'
        }}>
          <span style={{ minWidth: '100px', color: '#ccc' }}>{counter.name}:</span>
          <strong style={{ color: '#ffffff' }}>{counter.count}</strong>
          <button onClick={() => updateCounter(id, 1)}>+</button>
          <button onClick={() => updateCounter(id, -1)}>-</button>
          <button onClick={() => removeCounter(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>
            Remove
          </button>
        </div>
      ))}
      
      {Object.keys(counters).length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#ccc' }}>No counters created yet</p>
      )}
    </div>
  )
}

// Store State Inspector - shows how to access computed values
const StoreInspector = () => {
  const count = useCounterStore((state) => state.count)
  const isPositive = useCounterStore((state) => state.isPositive())
  const isNegative = useCounterStore((state) => state.isNegative())
  const counters = useCounterStore((state) => state.counters)
  
  return (
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px', margin: '10px 0', backgroundColor: '#2d2d2d' }}>
      <h3 style={{ color: '#ffffff' }}>Store State Inspector</h3>
      <div style={{ fontSize: '14px', color: '#ccc' }}>
        <p>Main count: {count}</p>
        <p>Is positive: {isPositive ? 'Yes' : 'No'}</p>
        <p>Is negative: {isNegative ? 'Yes' : 'No'}</p>
        <p>Total counters: {Object.keys(counters).length}</p>
        <p>Sum of all counters: {Object.values(counters).reduce((sum, c) => sum + c.count, 0)}</p>
      </div>
    </div>
  )
}

// Main Counter App Component
const CounterApp = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#2d2d2d', minHeight: '100vh' }}>
      <h1 style={{ color: '#ffffff' }}>Counter App - Zustand Basics</h1>
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        This example demonstrates basic Zustand concepts:
      </p>
      <ul style={{ color: '#ccc', marginBottom: '20px' }}>
        <li>Creating a store with state and actions</li>
        <li>Subscribing to store changes in components</li>
        <li>Updating state with actions</li>
        <li>Working with object state</li>
        <li>Computed/derived values</li>
      </ul>
      
      <SimpleCounter />
      <MultipleCounters />
      <StoreInspector />
    </div>
  )
}

export default CounterApp