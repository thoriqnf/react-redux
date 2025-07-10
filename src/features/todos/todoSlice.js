import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  filter: 'all'
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false
      }
      state.items.push(newTodo)
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed)
    }
  }
})

export const { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } = todoSlice.actions

export const selectTodos = (state) => state.todos.items
export const selectFilter = (state) => state.todos.filter
export const selectFilteredTodos = (state) => {
  const { items, filter } = state.todos
  switch (filter) {
    case 'active':
      return items.filter(todo => !todo.completed)
    case 'completed':
      return items.filter(todo => todo.completed)
    default:
      return items
  }
}
export const selectCompletedCount = (state) => state.todos.items.filter(todo => todo.completed).length
export const selectActiveCount = (state) => state.todos.items.filter(todo => !todo.completed).length

export default todoSlice.reducer