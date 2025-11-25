import React from 'react'
import { RouteObject } from 'react-router-dom'


const PostsList=React.lazy(()=>import('../features/posts/componments/postsList'))
const SinglePostPage=React.lazy(()=>import('../features/posts/componments/singlePostPage'))
const EditPostForm=React.lazy(()=>import('../features/posts/componments/editPostForm'))
const UsersList=React.lazy(()=>import('../features/users/page/usersList'))
const UserPage=React.lazy(()=>import('../features/users/page/usersPage'))
const NotificationsList=React.lazy(()=>import('../features/notifications/page/NotificationsList'))

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
  {
    path:'/users/',
    element:<UsersList/>
  },
  {
    path:'/users/:userId',
    element:<UserPage/>
  },
  {
    path:'/notifications',
    element:<NotificationsList/>
  }
]

export default routes