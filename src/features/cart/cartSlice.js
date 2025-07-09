import { createSlice } from '@reduxjs/toolkit'

// Placeholder cart slice - will be implemented later
const initialState = {
  items: [],
  total: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Placeholder reducers
    addToCart: () => {
      // Will implement later
    },
    removeFromCart: () => {
      // Will implement later
    },
    updateQuantity: () => {
      // Will implement later
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer