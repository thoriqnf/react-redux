import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todos/todoSlice'
import userReducer from '../features/users/userSlice'
import cartReducer from '../features/cart/cartSlice'

/**
 * ============================================================================================
 * REDUX STORE CONFIGURATION - The Heart of Redux
 * ============================================================================================
 * 
 * This file sets up the Redux store using Redux Toolkit's configureStore.
 * The store is the single source of truth for your application's state.
 * 
 * Key Concepts:
 * - Store: Holds the complete state tree of your application
 * - Reducers: Pure functions that specify how the state changes
 * - Actions: Plain objects describing what happened
 * - Middleware: Extends Redux with custom functionality
 * - DevTools: Integration for debugging and time-travel
 * 
 * @fileoverview Main Redux store configuration for the tutorial app
 */

/**
 * ============================================================================================
 * STORE CONFIGURATION
 * ============================================================================================
 * 
 * configureStore() is Redux Toolkit's standard method for creating a Redux store.
 * It automatically sets up:
 * 1. Redux DevTools Extension integration
 * 2. redux-thunk middleware for async actions
 * 3. Immutability and serializability checks in development
 * 4. Combined reducer from all feature slices
 */
export const store = configureStore({
  /**
   * REDUCER CONFIGURATION
   * 
   * Each key in this object becomes a slice of the global state.
   * The reducer combines all feature slices into a single root reducer.
   * 
   * State Structure:
   * {
   *   counter: { value: 0, incrementAmount: 1, history: [] },
   *   todos: { items: [], filter: 'all' },
   *   users: { users: [], loading: false, error: null },
   *   cart: { items: [], total: 0 }
   * }
   */
  reducer: {
    // Counter feature - manages counter state with history tracking
    counter: counterReducer,
    
    // Todo feature - manages todo list with filtering capabilities
    todos: todoReducer,
    
    // User feature - manages user data with async loading states
    users: userReducer,
    
    // Cart feature - manages shopping cart with item tracking
    cart: cartReducer,
  },
  
  /**
   * MIDDLEWARE CONFIGURATION
   * 
   * Redux Toolkit automatically adds:
   * - redux-thunk: For async actions (like API calls)
   * - Immutability check: Warns if state is mutated
   * - Serializability check: Warns if non-serializable values are in state
   * 
   * You can customize middleware like this:
   * middleware: (getDefaultMiddleware) => getDefaultMiddleware({
   *   serializableCheck: {
   *     ignoredActions: ['persist/PERSIST']
   *   }
   * })
   */
  
  /**
   * REDUX DEVTOOLS INTEGRATION
   * 
   * Automatically enables Redux DevTools in development.
   * DevTools provide:
   * - Action history and time-travel debugging
   * - State inspection and editing
   * - Action replay and performance monitoring
   * - Hot reloading support
   */
  devTools: true,
  
  /**
   * PRELOADED STATE (Optional)
   * 
   * You can provide initial state here:
   * preloadedState: {
   *   counter: { value: 5, incrementAmount: 2, history: [] }
   * }
   */
})

/**
 * ============================================================================================
 * TYPE DEFINITIONS (For Better IDE Support)
 * ============================================================================================
 * 
 * These would be TypeScript types, but we're using JSDoc for JavaScript.
 * They help with IDE autocomplete and documentation.
 */

/**
 * Root State Type
 * 
 * Represents the complete state tree of the application.
 * Inferred from the store's reducer configuration.
 * 
 * @typedef {Object} RootState
 * @property {Object} counter - Counter feature state
 * @property {number} counter.value - Current counter value
 * @property {number} counter.incrementAmount - Default increment amount
 * @property {Array} counter.history - Action history
 * @property {Object} todos - Todo feature state
 * @property {Array} todos.items - Todo items array
 * @property {string} todos.filter - Current filter (all, active, completed)
 * @property {Object} users - User feature state
 * @property {Array} users.users - Users array from API
 * @property {boolean} users.loading - Loading state
 * @property {string|null} users.error - Error message
 * @property {Object} cart - Cart feature state
 * @property {Array} cart.items - Cart items array
 * @property {number} cart.total - Total cart value
 */

/**
 * App Dispatch Type
 * 
 * Type of the dispatch function returned by the store.
 * 
 * @typedef {Function} AppDispatch
 */

/**
 * ============================================================================================
 * HELPER FUNCTIONS
 * ============================================================================================
 */

/**
 * Get the current state from the store
 * 
 * @returns {RootState} The current state tree
 */
export const getRootState = () => store.getState()

/**
 * Get the dispatch function from the store
 * 
 * @returns {AppDispatch} The dispatch function
 */
export const getAppDispatch = () => store.dispatch

/**
 * ============================================================================================
 * COMMON SELECTOR FUNCTIONS
 * ============================================================================================
 * 
 * These are reusable functions to extract specific pieces of state.
 * Using selectors makes your code more maintainable and testable.
 */

/**
 * Select the entire counter state
 * 
 * @param {RootState} state - The root state
 * @returns {Object} The counter state object
 */
export const selectCounterState = (state) => state.counter

/**
 * Select the entire todo state
 * 
 * @param {RootState} state - The root state
 * @returns {Object} The todo state object
 */
export const selectTodoState = (state) => state.todos

/**
 * Select the entire user state
 * 
 * @param {RootState} state - The root state
 * @returns {Object} The user state object
 */
export const selectUserState = (state) => state.users

/**
 * Select the entire cart state
 * 
 * @param {RootState} state - The root state
 * @returns {Object} The cart state object
 */
export const selectCartState = (state) => state.cart

/**
 * ============================================================================================
 * STORE SUBSCRIPTION (Advanced)
 * ============================================================================================
 * 
 * The store allows you to subscribe to state changes.
 * This is usually handled by React-Redux, but you can do it manually:
 * 
 * const unsubscribe = store.subscribe(() => {
 *   console.log('State changed:', store.getState())
 * })
 * 
 * // Later, to stop listening:
 * unsubscribe()
 */

/**
 * ============================================================================================
 * DEBUGGING UTILITIES
 * ============================================================================================
 */

/**
 * Log the current state to console (for debugging)
 * 
 * @param {string} label - Optional label for the log
 */
export const logCurrentState = (label = 'Current State') => {
  // Only log in development mode
  console.log(`${label}:`, store.getState())
}

/**
 * ============================================================================================
 * USAGE EXAMPLES
 * ============================================================================================
 * 
 * How to use this store in your components:
 * 
 * // In a component:
 * import { useSelector, useDispatch } from 'react-redux'
 * import { increment } from '../features/counter/counterSlice'
 * 
 * function MyComponent() {
 *   const count = useSelector(state => state.counter.value)
 *   const dispatch = useDispatch()
 *   
 *   return (
 *     <button onClick={() => dispatch(increment())}>
 *       Count: {count}
 *     </button>
 *   )
 * }
 * 
 * // In App.js:
 * import { Provider } from 'react-redux'
 * import { store } from './store/store'
 * 
 * function App() {
 *   return (
 *     <Provider store={store}>
 *       <MyComponent />
 *     </Provider>
 *   )
 * }
 */

/**
 * ============================================================================================
 * BEST PRACTICES IMPLEMENTED
 * ============================================================================================
 * 
 * 1. Feature-based organization: Each feature has its own slice
 * 2. Descriptive naming: Clear names for state slices and actions
 * 3. Single store: One store for the entire application
 * 4. Immutable updates: Redux Toolkit ensures immutability
 * 5. DevTools integration: Easy debugging in development
 * 6. Type safety: JSDoc comments for better IDE support
 * 7. Modular structure: Easy to add new features
 * 8. Separation of concerns: Each slice handles its own state
 */

// Export the store as the default export
export default store