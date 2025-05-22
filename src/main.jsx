import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Mexatronika from './pages/mexatronika.jsx';
import { ATIV, MBBT, TJMOA } from './pages/index.js';


let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/mexat",
    Component: Mexatronika,
  },
  {
    path: "/tjmoa",
    Component: TJMOA,
  },
  {
    path: "/ativ",
    Component: ATIV,
  },
  {
    path: "/mbbt",
    Component: MBBT,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
