import { useAppSelector, useAppDispatch } from '@/store'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames'
import { useEffect } from 'react'
import { selectAllUsers } from '../../users/store/users'
import { 
  useGetNotificationsQuery, 
  allNotificationsRead, 
  selectMetadataEntities 
} from '../store/notice'

const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)
  const users = useAppSelector(selectAllUsers)

  useEffect(() => {
    return () => {
       dispatch(allNotificationsRead())
    }
  }, [dispatch])

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }

    const metadata = notificationsMetadata[notification.id]

    const notificationClassname = classNames('notification', {
      new: metadata.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList