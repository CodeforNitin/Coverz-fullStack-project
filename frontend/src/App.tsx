import { createBrowserRouter, RouteObject, RouterProvider,Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Error from "./pages/Error";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from './pages/Login';
import { useAuthContext } from "./hooks/useAuthContext";
// import Page from "./pages/configure/upload/Page";
import FileUpload from "./pages/configure/upload/FileUpload";


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
      path: "/configure/upload",
      // element: <Page/>
      element: <FileUpload/>
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
