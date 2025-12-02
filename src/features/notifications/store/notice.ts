import {
  createSlice,
  createEntityAdapter,
  createAction,
  isAnyOf,
} from '@reduxjs/toolkit'
import { apiSlice } from '@/features/api/apiSlice'
import { forceGenerateNotifications } from '@/api/server'
import { RootState } from '../../../store'

interface Notification {
  id: string
  message: string
  date: string
  user: string
  read: boolean
  isNew?: boolean
}

interface NotificationMessage {
  type: "notifications";
  payload: Notification[];
}

const notificationsReceived = createAction<Notification[]>(
  "notifications/notificationsReceived"
);

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => "/notifications",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const ws = new WebSocket("ws://localhost");
        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent<string>) => {
            const message: NotificationMessage = JSON.parse(event.data);

            switch (message.type) {
              case "notifications": {
                updateCachedData((draft) => {
                  draft.push(...message.payload);
                  draft.sort((a, b) => b.date.localeCompare(a.date));
                });
                dispatch(notificationsReceived(message.payload));
                break;
              }
              default:
                break;
            }
          };

          ws.addEventListener("message", listener);
        } catch {}

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = extendedApi;

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const matchNotificationsReceived = isAnyOf(
  notificationsReceived,
  extendedApi.endpoints.getNotifications.matchFulfilled
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      const notificationsMetadata = action.payload.map((notification) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }));

      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });

      notificationsAdapter.upsertMany(state, notificationsMetadata);
    });
  }
});

export const { allNotificationsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;

export const {
  selectAll: selectNotificationsMetadata,
  selectEntities: selectMetadataEntities,
} = notificationsAdapter.getSelectors((state: RootState) => state.notice);

export const fetchNotificationsWebsocket = () => (dispatch: any, getState: () => RootState) => {
  const allNotifications = extendedApi.endpoints.getNotifications.select()(getState()).data ?? [];
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification?.date ?? "";
  forceGenerateNotifications(latestTimestamp);
};