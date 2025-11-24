import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { getPosts,addPost } from '../service/postsList';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (arg, { dispatch }) => {
  const response = await getPosts();
  return response
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: {title: string; content: string; userId: string}, { dispatch }) => {
  const response = await addPost(initialPost);
  return response
});

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

interface PostsState {
  posts: Posts[];
  state: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  state: 'idle',
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state: PostsState, action) => {
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded(state: PostsState, action) {
      const { postId, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction as keyof typeof post.reactions]++;
      }
    },
  },
    extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.state = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.state = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.state = 'failed'
        state.error = action.error.message || null
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
});


export const { postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectPostById = (state: { posts: PostsState }, postId: string) => state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;

