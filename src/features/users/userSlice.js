import { createSlice } from '@reduxjs/toolkit'

// Placeholder user slice - will be implemented later
const initialState = {
  users: [],
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Placeholder reducers
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setLoading, setError } = userSlice.actions
export default userSlice.reducer