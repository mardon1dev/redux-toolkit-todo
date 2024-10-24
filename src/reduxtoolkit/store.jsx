import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "./slice/crudSLice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
  },
});
