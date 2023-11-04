import { Outlet } from "react-router-dom";
import useCheckLogin from "../hooks/useCheckLogin";

const Layout = () => {
  useCheckLogin();

  return (
    <div>
      <div>Layout component</div>
      <Outlet />
    </div>
  );
};

export default Layout;
