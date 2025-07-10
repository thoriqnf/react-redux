import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todos/todoSlice'
import userReducer from '../features/users/userSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    users: userReducer,
    cart: cartReducer,
  },
  devTools: true,
})

export default store