import { createSlice, nanoid, createAsyncThunk,createEntityAdapter,createSelector } from '@reduxjs/toolkit'
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



const postsAdapter = createEntityAdapter<Posts>({
  sortComparer: (a: Posts, b: Posts) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null as string | null
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction as keyof typeof existingPost.reactions]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      });
  }
});


export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: any) => state.posts)


export const selectPostsByUser = createSelector(
  [selectAllPosts, (state,userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)
