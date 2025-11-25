import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { getUsers } from "../service/user";



export const fetchUsers = createAsyncThunk('users/fetchUsers', async (arg, { dispatch }) => {
  const response = await getUsers();
  return response
});

interface User {
  id: string;
  name: string;
}



const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload)
    })
  }
});


export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: any) => state.users)

export default usersSlice.reducer;