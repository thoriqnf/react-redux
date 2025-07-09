import { create } from 'zustand'

// Basic Zustand store for counter functionality
// This demonstrates the simplest form of state management with Zustand
const useCounterStore = create((set, get) => ({
  // State
  count: 0,
  
  // Actions - functions that modify state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  
  // You can also use the get() function to access current state
  incrementBy: (value) => set({ count: get().count + value }),
  
  // Reset to initial state
  reset: () => set({ count: 0 }),
  
  // Computed values (derived state)
  isPositive: () => get().count > 0,
  isNegative: () => get().count < 0,
  
  // Multiple counters example
  counters: {},
  
  // Actions for multiple counters
  createCounter: (id) => set((state) => ({
    counters: {
      ...state.counters,
      [id]: { count: 0, name: `Counter ${id}` }
    }
  })),
  
  updateCounter: (id, value) => set((state) => ({
    counters: {
      ...state.counters,
      [id]: {
        ...state.counters[id],
        count: state.counters[id].count + value
      }
    }
  })),
  
  removeCounter: (id) => set((state) => {
    const newCounters = { ...state.counters }
    delete newCounters[id]
    return { counters: newCounters }
  })
}))

export default useCounterStore