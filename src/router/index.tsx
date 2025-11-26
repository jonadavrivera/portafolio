import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Proyectos from "../pages/Proyectos";
import NotFound from "../pages/NotFound";
import PageTransition from "../components/layout/PageTransition";

function Layout() {
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/proyectos",
                element: <Proyectos />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
]);