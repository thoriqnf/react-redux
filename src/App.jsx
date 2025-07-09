import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Counter from './pages/Counter'
import TodoList from './pages/TodoList'
import UserList from './pages/UserList'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import './App.css'

/**
 * Main App Component
 * 
 * This component sets up:
 * 1. Redux Provider - makes the store available to all components
 * 2. React Router - enables navigation between pages
 * 3. Navigation component - persistent across all pages
 * 4. Route definitions - maps URLs to components
 * 
 * The Redux store is now available to ALL components in the app!
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App