import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { worker } from './api/server'
import { Provider } from 'react-redux'
import store from './store/index'
import './primitiveui.css'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { extendedApiSlice } from './features/users/store/users'

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' })
  const root = createRoot(document.getElementById('root')!)

  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  root.render(
    <React.StrictMode>
      <Provider store={store} >
        <HashRouter future={{ v7_startTransition: true }}>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  )
}

start()
