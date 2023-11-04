import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import * as URLS from "../constants/urls";

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
      element: <>login</>,
    },
  ] as RouteObject[];

  return useRoutes(routers);
};

export default RouteRenderer;
