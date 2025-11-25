import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { selectPostsByUser } from '../../posts/store/posts'


const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector(state =>
    state.users.entities[userId!]
  )
  if (!user) {
    return (<section>
        <h2>User not found!</h2>
      </section>
    )
  }
  const postsForUser = selectPostsByUser(
    useAppSelector(state => state),
    user.id
  )



  const postTitles = postsForUser.map(post => (
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