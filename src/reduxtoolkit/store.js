import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "./slice/crudSlice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
  },
});
