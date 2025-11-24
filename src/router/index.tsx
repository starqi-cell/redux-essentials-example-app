import React from 'react'
import { RouteObject } from 'react-router-dom'


const PostsList=React.lazy(()=>import('../features/posts/componments/postsList'))
const SinglePostPage=React.lazy(()=>import('../features/posts/componments/singlePostPage'))
const EditPostForm=React.lazy(()=>import('../features/posts/componments/editPostForm'))



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