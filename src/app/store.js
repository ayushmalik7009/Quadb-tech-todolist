import { configureStore } from "@reduxjs/toolkit";  
import todReducer from '../features/todo/todoSlice'

export const store = configureStore({
    reducer:todReducer
})