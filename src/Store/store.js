import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenses from "./expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenses,
  },
});

export default store;