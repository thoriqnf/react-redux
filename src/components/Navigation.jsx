import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Navigation Component
 * 
 * This component demonstrates how Redux state can be accessed 
 * from any component in the app, including navigation.
 * The cart counter will show the total items across all pages.
 */
function Navigation() {
  const location = useLocation()
  
  // Get cart items count from Redux store
  // This will be available once we create the cart slice
  const cartItemsCount = useSelector(state => {
    // Safe check in case cart slice isn't ready yet
    return state.cart ? state.cart.items.length : 0
  })

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            Redux Tutorial
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/counter" className={isActive('/counter')}>
            Counter
          </Link>
          <Link to="/todos" className={isActive('/todos')}>
            Todos
          </Link>
          <Link to="/users" className={isActive('/users')}>
            Users
          </Link>
          <Link to="/products" className={isActive('/products')}>
            Products
          </Link>
          <Link to="/cart" className={isActive('/cart')}>
            Cart {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation