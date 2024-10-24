import { createSlice } from "@reduxjs/toolkit";

const crudSlice = createSlice({
  name: "crud",
  initialState: {
    data: [],
  },
  reducers: {
    addData(state, action) {
      state.data.push(action.payload);
    },
    removeData(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateData(state, action) {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { addData, removeData, updateData } = crudSlice.actions;

export default crudSlice.reducer;
