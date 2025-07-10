import { createSlice, legacy_createStore } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  incrementAmount: 1,
  history: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push({
        action: "increment",
        value: state.value,
        timestamp: Date.now(),
      });
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push({
        action: "decrement",
        value: state.value,
        timestamp: Date.now(),
      });
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push({
        action: "incrementByAmount",
        amount: action.payload,
        value: state.value,
        timestamp: Date.now(),
      });
    },
    setIncrementAmount: (state, action) => {
      state.incrementAmount = action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.incrementAmount = 1;
      state.history.push({ action: "reset", value: 0, timestamp: Date.now() });
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setIncrementAmount,
  reset,
  clearHistory,
} = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectIncrementAmount = (state) => state.counter.incrementAmount;
export const selectHistory = (state) => state.counter.history;

export default counterSlice.reducer;
