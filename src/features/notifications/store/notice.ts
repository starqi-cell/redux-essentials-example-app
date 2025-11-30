import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import { getNotice } from '../service/notice'
import { RootState } from '../../../store'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const state = getState() as RootState
    const allNotifications = Object.values(state.notice.entities)
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await getNotice(latestTimestamp)
    return response
  }
)

interface Notification {
  id: string
  message: string
  date: string
  user: string
  read: boolean
  isNew?: boolean
}

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState()

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    })
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notice)

export default notificationsSlice.reducer