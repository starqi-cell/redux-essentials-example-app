import React from 'react'
import { RouteObject } from 'react-router-dom'


const PostsList=React.lazy(()=>import('../features/posts/postsList'))
const SinglePostPage=React.lazy(()=>import('../features/posts/singlePostPage'))
const EditPostForm=React.lazy(()=>import('../features/posts/editPostForm'))



const routes: RouteObject[] = [
  {
    path: '/',
    element: <PostsList />,
  },
  {
    path: '/posts/:postId',
    element: <SinglePostPage />,
  },
  {
    path: '/edit/:postId',
    element: <EditPostForm />,
  },
]

export default routes