import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { EstimatingForm } from './pages/formPage/estimatingForm.jsx';
import { RegForm } from './pages/auth/regForm.jsx';
import { LoginForm } from './pages/auth/loginForm.jsx';

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/estimate",
    element:<EstimatingForm />
  },
  {
    path :"/register",
    element:<RegForm />
  },
  {
    path :"/login",
    element:<LoginForm />
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
)