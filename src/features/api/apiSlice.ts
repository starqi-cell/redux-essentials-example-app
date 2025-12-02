import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts } from "../posts/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts[], void>({
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post" as const, id })),
      ],
    }),
    getPost: builder.query<Posts, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: "POST",
        body: { reaction },
      }),
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((post) => post.id === postId);
            if (post) {
              post.reactions[reaction as keyof typeof post.reactions]++;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;