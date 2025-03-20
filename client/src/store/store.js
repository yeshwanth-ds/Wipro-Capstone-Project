import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    income: incomeReducer,
    expenses: expenseReducer,
  },
});

export default store;
