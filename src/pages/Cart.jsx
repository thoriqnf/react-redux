import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount
} from '../features/cart/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const itemsCount = useSelector(selectCartItemsCount)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <p>{itemsCount} item{itemsCount !== 1 ? 's' : ''} in your cart</p>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">{item.image}</div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-price">${item.price}</div>
            </div>
            <div className="item-quantity">
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="quantity-button"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="quantity-button"
              >
                +
              </button>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              onClick={() => handleRemoveItem(item.id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </div>
        <div className="cart-actions">
          <button 
            onClick={handleClearCart}
            className="clear-cart-button"
          >
            Clear Cart
          </button>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
          <button className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart