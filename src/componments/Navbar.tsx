import { Link } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '@/store'
import { 
  fetchNotificationsWebsocket, 
  selectNotificationsMetadata, 
  useGetNotificationsQuery 
} from '@/features/notifications/store/notice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  
  useGetNotificationsQuery();

  const notificationsMetadata = useAppSelector(selectNotificationsMetadata)
  const numUnreadNotifications = notificationsMetadata.filter(n => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket())
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
