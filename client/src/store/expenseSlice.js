import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { expenseList: [], totalExpenses: 0 },
  reducers: {
    setExpenses: (state, action) => {
      state.expenseList = action.payload.expenseList;
      state.totalExpenses = action.payload.totalExpenses;
    },
    addExpense: (state, action) => {
      state.expenseList.push(action.payload);
      state.totalExpenses += action.payload.amount;
    },
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
