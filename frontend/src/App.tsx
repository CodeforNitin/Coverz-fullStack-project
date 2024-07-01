import { createBrowserRouter, RouteObject, RouterProvider,Navigate } from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext'
import Home from "./pages/Home";
import Error from "./pages/Error";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from './pages/Login';


function App() {

  const {user} = useAuthContext();
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
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
