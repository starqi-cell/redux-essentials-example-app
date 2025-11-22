import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';




export interface Posts {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}

const initialState: Posts[] = [
  { id: '1', title: 'First Post', content: 'Hello World', user: '0', date: new Date().toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
  { id: '2', title: 'Second Post', content: 'Redux is great', user: '1', date: new Date().toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
  { id: '3', title: 'Third Post', content: 'React is awesome', user: '2', date: new Date().toISOString(), reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
          },
          meta: undefined,
          error: undefined,
        };
      },
    },
    postUpdated: (state: Posts[], action) => {
      const { id, title, content } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction as keyof typeof post.reactions]++;
      }
    },
  },
});


export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
