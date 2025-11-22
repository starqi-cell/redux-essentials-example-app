import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { worker } from './api/server'
import { Provider } from 'react-redux'
import store from './store'
import './primitiveui.css'
import './index.css'
import { HashRouter } from 'react-router-dom'


async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' })
  const root = createRoot(document.getElementById('root')!)
  
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  )
}

start()
