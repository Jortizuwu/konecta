import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});

export const { increment } = uiSlice.actions;

const uiReducer = uiSlice.reducer;

export default uiReducer;
