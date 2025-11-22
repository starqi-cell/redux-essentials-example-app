import React from 'react'
import { RouteObject } from 'react-router-dom'


const PostsList=React.lazy(()=>import('../features/posts/PostsList'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PostsList />,
  },
]

export default routes