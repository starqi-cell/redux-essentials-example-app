import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from "../service/user";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (arg, { dispatch }) => {
  const response = await getUsers();
  return response
});

interface User {
  id: string;
  name: string;
}

const initialState: User[] = [
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
});



export default usersSlice.reducer;