import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Login from './pages/Login'
import Map from './pages/Map'
import Create from './pages/Create'
import MapLayout, { loader as tripLoader } from './layouts/MapLayout'
import Welcome from './pages/Welcome'
import Settings from './pages/Settings'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTheme } from './functions/utils'
import NotFound from './pages/NotFound'

export default function App() {
  const theme = useSelector(state => state.user.theme)

  useEffect(() => {
    if(theme === 'dark'){
      document.documentElement.style.setProperty('--color-primary', 'rgb(12, 19, 27)')
      document.documentElement.style.setProperty('--color-secondary', 'rgb(25, 34, 48)')
      document.documentElement.style.setProperty('--color-accent', 'rgb(67, 61, 223)')
      document.documentElement.style.setProperty('--color-error', 'rgb(244, 69, 69)')
      document.documentElement.style.setProperty('--color-text', '#fff')
      document.documentElement.style.setProperty('--color-icons', '#fff')
    }
    if(theme === 'light'){
      document.documentElement.style.setProperty('--color-secondary', 'rgb(249, 249, 249)')
      document.documentElement.style.setProperty('--color-primary', 'rgb(240, 239, 239)')
      document.documentElement.style.setProperty('--color-accent', 'rgb(230, 79, 59)')
      document.documentElement.style.setProperty('--color-error', 'rgb(217, 87, 87)')
      document.documentElement.style.setProperty('--color-text', '#313131')
      document.documentElement.style.setProperty('--color-icons', 'rgb(211, 211, 211)')
    }
    if(theme === 'blue'){
      document.documentElement.style.setProperty('--color-secondary', 'rgb(55, 67, 128)')
      document.documentElement.style.setProperty('--color-primary', 'rgb(32, 37, 74)')
      document.documentElement.style.setProperty('--color-accent', 'rgb(44, 223, 146)')
      document.documentElement.style.setProperty('--color-error', 'rgb(217, 87, 87)')
      document.documentElement.style.setProperty('--color-text', '#ffffff')
      document.documentElement.style.setProperty('--color-icons', 'rgb(138, 183, 237)')
    }
  
  }, [theme])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/welcome'/>,
      errorElement: <NotFound/>
    },
    {
      path: '/app',
      element: <Navigate replace to='/app/map'/>
    },
    {
      path: '/welcome',
      element: <Welcome/>
    },
    {
      path: '/app',
      element: <RootLayout/>,
      children: [
        {
          path: 'map',
          element: <MapLayout/>,
          loader: tripLoader
        },
        {
          path: 'create',
          element: <Create/>
        },
        {
          path: 'settings',
          element: <Settings/>
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}
