import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store'

const UsersList = () => {
  const users = useAppSelector(state => state.users)

  const renderedUsers = users.ids.map(id => {
    const user = users.entities[id]
    if (!user) return null
    return (
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li>
    )
  })

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList