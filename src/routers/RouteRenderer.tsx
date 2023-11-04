import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import * as URLS from "../constants/urls";
import Login from "../components/Login";

const RouteRenderer = () => {
  const children = [
    {
      path: URLS.LOANS,
      element: <>loans</>,
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
