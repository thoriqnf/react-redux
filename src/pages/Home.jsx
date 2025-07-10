import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="home-container">
      <h1>React Redux App</h1>
      <p className="intro">
        Explore different Redux patterns and state management techniques.
      </p>
      
      <div className="tutorial-sections">
        <div className="section">
          <h2>🔢 Counter</h2>
          <p>Basic Redux state management with increment/decrement functionality.</p>
          <Link to="/counter" className="section-link">
            Go to Counter →
          </Link>
        </div>
        
        <div className="section">
          <h2>📝 Todo List</h2>
          <p>Array state management with add, remove, toggle, and filtering.</p>
          <Link to="/todos" className="section-link">
            Go to Todos →
          </Link>
        </div>
        
        <div className="section">
          <h2>👥 User List</h2>
          <p>Async operations with API calls using createAsyncThunk.</p>
          <Link to="/users" className="section-link">
            Go to Users →
          </Link>
        </div>
        
        <div className="section">
          <h2>🛍️ Shopping Cart</h2>
          <p>Global state management across multiple pages.</p>
          <Link to="/products" className="section-link">
            Go to Products →
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home