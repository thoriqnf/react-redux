import { createSlice } from '@reduxjs/toolkit'

// Placeholder todo slice - will be implemented later
const initialState = {
  items: [],
  filter: 'all'
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Placeholder reducers
    addTodo: () => {
      // Will implement later
    },
    toggleTodo: () => {
      // Will implement later
    },
    removeTodo: () => {
      // Will implement later
    }
  }
})

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer