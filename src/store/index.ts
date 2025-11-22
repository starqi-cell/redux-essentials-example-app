import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;