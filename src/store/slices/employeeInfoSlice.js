import { createSlice } from '@reduxjs/toolkit';

const employeeInfoSlice = createSlice({
  name: 'employees',
  initialState: { data: [], error: null, loading: false },
  reducers: {
    getEmployeesRequest: (state) => { 
      state.loading = true; 
    },
    getEmployeesFulfilled: (state, action) => { 
      state.loading = false;
      state.data = action.payload;
    },
    getEmployeesFailed: (state, action) => {
      state.loading = false; 
      state.error = action.payload
    }
  },
});

export const { getEmployeesRequest, getEmployeesFulfilled, getEmployeesFailed } = employeeInfoSlice.actions;
export default employeeInfoSlice.reducer;   