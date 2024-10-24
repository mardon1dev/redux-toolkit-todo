import { configureStore } from "@reduxjs/toolkit";
import crudSLice from "./slice/crudSLice";


export const store = configureStore({
    reducer: {
        crud: crudSLice
    }
})