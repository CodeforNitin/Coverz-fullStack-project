import { createBrowserRouter, RouteObject, RouterProvider,Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Error from "./pages/Error";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from './pages/Login';
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
  const {user} = useAuthContext()

  const routes: RouteObject[] = [
    {
      path: "/",
      element:  <Home/>
    },
    {
      path: "/signup",
      element: !user ? <SignupForm/> : <Navigate to='/' />
    },
    {
      path: "/login",
      element: !user ? <LoginForm/> : <Navigate to='/' />
    },
    {
      path: "*",
      element: <Error />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
