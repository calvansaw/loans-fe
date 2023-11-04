import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import * as ROUTES from "../constants/routes";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import Requests from "../components/Requests/Requests";

const RouteRenderer = () => {
  const children = [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: ROUTES.REQUESTS,
      element: <Requests />,
    },
  ];

  const routers = [
    {
      path: ROUTES.BASE,
      element: <Layout />,
      children,
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },
  ] as RouteObject[];

  return useRoutes(routers);
};

export default RouteRenderer;
