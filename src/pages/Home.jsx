import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Home Page Component
 * 
 * This is the landing page that explains what this tutorial covers
 * and provides navigation to different examples.
 */
function Home() {
  return (
    <div className="home-container">
      <h1>React Redux Tutorial</h1>
      <p className="intro">
        Welcome to this comprehensive React Redux tutorial! This project demonstrates 
        how to use Redux for state management in React applications.
      </p>
      
      <div className="tutorial-sections">
        <div className="section">
          <h2>🔢 Counter Example</h2>
          <p>
            Learn the basics of Redux with a simple counter that demonstrates:
            actions, reducers, and the Redux store.
          </p>
          <Link to="/counter" className="section-link">
            Go to Counter →
          </Link>
        </div>
        
        <div className="section">
          <h2>📝 Todo List</h2>
          <p>
            Explore array state management with a todo list featuring add, remove, 
            toggle, and filtering capabilities.
          </p>
          <Link to="/todos" className="section-link">
            Go to Todos →
          </Link>
        </div>
        
        <div className="section">
          <h2>👥 User List (API)</h2>
          <p>
            Learn async operations with Redux Toolkit's createAsyncThunk by 
            fetching users from an API.
          </p>
          <Link to="/users" className="section-link">
            Go to Users →
          </Link>
        </div>
        
        <div className="section">
          <h2>🛍️ Shopping Cart</h2>
          <p>
            See how Redux manages global state across multiple pages with a 
            shopping cart that persists across navigation.
          </p>
          <Link to="/products" className="section-link">
            Go to Products →
          </Link>
        </div>
      </div>
      
      <div className="key-concepts">
        <h2>🎯 Key Redux Concepts You'll Learn</h2>
        <ul>
          <li><strong>Store:</strong> The single source of truth for your app's state</li>
          <li><strong>Actions:</strong> Plain objects that describe what happened</li>
          <li><strong>Reducers:</strong> Pure functions that specify how state changes</li>
          <li><strong>Slices:</strong> Redux Toolkit's way to organize actions and reducers</li>
          <li><strong>Selectors:</strong> Functions that extract specific pieces of state</li>
          <li><strong>Async Thunks:</strong> Handling asynchronous operations like API calls</li>
          <li><strong>Hooks:</strong> useSelector and useDispatch for connecting React to Redux</li>
        </ul>
      </div>
      
      <div className="getting-started">
        <h2>🚀 Getting Started</h2>
        <p>
          Start with the <Link to="/counter">Counter Example</Link> to understand 
          the basics, then progress through the other examples to see increasingly 
          complex Redux patterns.
        </p>
      </div>
    </div>
  )
}

export default Home