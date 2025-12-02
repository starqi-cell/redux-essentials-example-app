import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../store/users'
import { useGetPostsQuery } from '../../api/apiSlice'
import { useMemo } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { Posts } from '../../posts/types'

const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector(state => selectUserById(state, userId!))

  const selectPostsForUser = useMemo(() => {
    const emptyArray: Posts[] = [];
    return createSelector(
      (res: any) => res.data,
      (res: any, userId: string) => userId,
      (data: Posts[], userId: string) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    );
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId!),
    }),
  });

  if (!user) {
    return (<section>
        <h2>User not found!</h2>
      </section>
    )
  }

  const postTitles = postsForUser.map((post: Posts) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage