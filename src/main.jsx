import { StrictMode,createContext,useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Usercontext=createContext({isAuthenticated:false});

const Appwraper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem('isAuthenticated') === 'true');
  const [user,setUser]=useState({})
  return(
    <Usercontext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
      <App/>
    </Usercontext.Provider>
  )

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwraper/>
  </StrictMode>,
)
