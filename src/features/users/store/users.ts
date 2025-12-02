import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../../store";

interface User {
  id: string;
  name: string;
}

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      transformResponse: (responseData: User[]) => {
        return usersAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => selectUsersData(state) ?? initialState);