import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems } from '../features/cart/cartSlice'

const mockProducts = [
  { id: 1, name: 'Laptop', price: 999, image: '💻', description: 'High-performance laptop' },
  { id: 2, name: 'Phone', price: 699, image: '📱', description: 'Latest smartphone' },
  { id: 3, name: 'Headphones', price: 199, image: '🎧', description: 'Wireless headphones' },
  { id: 4, name: 'Watch', price: 299, image: '⌚', description: 'Smart watch' },
  { id: 5, name: 'Tablet', price: 499, image: '📟', description: 'Portable tablet' },
  { id: 6, name: 'Camera', price: 799, image: '📷', description: 'Digital camera' },
  { id: 7, name: 'Speaker', price: 99, image: '🔊', description: 'Bluetooth speaker' },
  { id: 8, name: 'Keyboard', price: 79, image: '⌨️', description: 'Mechanical keyboard' }
]

function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const getQuantityInCart = (productId) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  return (
    <div className="product-container">
      <h1>Product List</h1>
      <p>Add products to your cart and see the cart counter update in the navigation!</p>
      
      <div className="product-grid">
        {mockProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">${product.price}</div>
            <button 
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
            {getQuantityInCart(product.id) > 0 && (
              <div className="quantity-indicator">
                In cart: {getQuantityInCart(product.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList