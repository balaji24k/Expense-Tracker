import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  showPremium: localStorage.getItem("isPremium") === true,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    Premium(state) {
      state.showPremium = true;
      localStorage.setItem("isPremium", true);
    },

    notPremium(state) {
      state.showPremium = false;
      localStorage.setItem("isPremium", false);
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;