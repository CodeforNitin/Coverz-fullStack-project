import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import Error from "./pages/Error";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from './pages/Login';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    path:"/signup",
    element: <SignupForm/>
  },
  {
    path:"/login",
    element: <LoginForm/>
  },
  {
    path:"*",
    element: <Error/>
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
