import { createSlice } from '@reduxjs/toolkit';



interface Posts {
  id: string;
  title: string;
  content: string;
}

const initialState: Posts[] = [
  { id: '1', title: 'First Post', content: 'Hello World' },
  { id: '2', title: 'Second Post', content: 'Redux is great' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
