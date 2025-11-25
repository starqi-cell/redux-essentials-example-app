import { useAppSelector, useAppDispatch } from '@/store'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames'
import { useEffect } from 'react'
import { allNotificationsRead, fetchNotifications } from '../store/notice'

const NotificationsList = () => {
  const dispatch = useAppDispatch()
  

  const notifications = useAppSelector(state => state.notice)
  const users = useAppSelector(state => state.users)
  



  useEffect(() => {
    return () => {
       dispatch(allNotificationsRead())
    }
  }, [dispatch])

  const renderedNotifications = Object.values(notifications.entities).map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.entities[notification.user] || {
      name: 'Unknown User'
    }


    const notificationClassname = classNames('notification', {
      new: notification.isNew,
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
      {/* 这里可以验证：未读数量是否在累积 */}
      <h2>Notifications ({Object.values(notifications.entities).filter(n => !n.read).length})</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList