import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Create from './pages/Create'
import MapLayout, { loader as tripLoader } from './layouts/MapLayout'
import Welcome from './pages/Welcome'
import Settings from './pages/Settings'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {  setThemeColors } from './functions/utils'
import NotFound from './pages/NotFound'

export default function App() {
  const theme = useSelector(state => state.user.theme)

  useEffect(() => {
    if(!theme) return
    setThemeColors(theme)
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
