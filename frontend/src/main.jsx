import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-dtf8vsvl47vdrhxp.us.auth0.com"
    clientId="QeDTM7kAF5RHoWS3ZoZYrJ7NpHvrc5A9"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <StrictMode>
    
    <App />
   </StrictMode>
  </Auth0Provider>
  
)
