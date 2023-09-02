import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './App'
import Basic from './Basic'
import ProcedurallyGenerated from './ProcedurallyGenerated'
import Lighthouse from './Lighthouse'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/basic',
    element: <Basic />
  },
  {
    path: '/procedurally-generated',
    element: <ProcedurallyGenerated />
  },
  {
    path: '/blender-lighthouse',
    element: <Lighthouse />
  }
], {
  basename: '/three.js-practice/'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <CssBaseline />
  </>
)
