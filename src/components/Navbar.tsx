import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '@/store'
import { fetchNotifications } from '@/features/notifications/store/notice'



export const Navbar = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(state => state.notice)
  const numUnreadNotifications = Object.values(notifications.entities).filter(n => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  let unreadNotificationsBadge

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">文章列表</Link>
            <Link to="/users">用户列表</Link>
            <Link to="/notifications">通知列表{unreadNotificationsBadge}</Link>

          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
