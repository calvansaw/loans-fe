import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import * as URLS from "../constants/urls";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard/Dashboard";

const RouteRenderer = () => {
  const children = [
    {
      index: true,
      element: <Dashboard />,
    },
  ];

  const routers = [
    {
      path: "/",
      element: <Layout />,
      children,
    },
    {
      path: URLS.LOGIN,
      element: <Login />,
    },
  ] as RouteObject[];

  return useRoutes(routers);
};

export default RouteRenderer;
