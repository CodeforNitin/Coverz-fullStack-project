import { createBrowserRouter, RouteObject, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { SignupForm } from "./pages/Signup";
import { LoginForm } from './pages/Login';
import { useAuthContext } from "./hooks/useAuthContext";
import FileUpload from "./pages/configure/upload/FileUpload";
import Layout from "./components/Layout";

function App() {
  const { user } = useAuthContext();

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />, // Use Layout component here
      children: [
        { path: "/", element: <Home /> },
        {
          path: "signup",
          element: !user ? <SignupForm /> : <Navigate to="/" />
        },
        {
          path: "login",
          element: !user ? <LoginForm /> : <Navigate to="/" />
        },
        {
          path: "configure/upload",
          element: <FileUpload />
        },
        { path: "*", element: <Error /> },
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
