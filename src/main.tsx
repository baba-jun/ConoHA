import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter} from 'react-router-dom';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)

// export const API_URL = 'http://160.251.180.174'
export const API_URL = 'http://localhost:8080'
