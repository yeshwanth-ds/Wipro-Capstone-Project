import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: { incomeList: [], totalIncome: 0 },
  reducers: {
    setIncome: (state, action) => {
      state.incomeList = action.payload.incomeList;
      state.totalIncome = action.payload.totalIncome;
    },
    addIncome: (state, action) => {
      state.incomeList.push(action.payload);
      state.totalIncome += action.payload.amount;
    },
  },
});

export const { setIncome, addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
