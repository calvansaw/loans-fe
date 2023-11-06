import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
// import useCheckLogin from "../../hooks/useCheckLogin";
import { AppBar, Drawer } from "./Layout.styles";
import { BASE, REQUESTS } from "../../constants/routes";
import { LOGOUT_URL } from "../../constants/urls";
import { revoke } from "../../services/auth";

const Layout = () => {
  // useCheckLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Loans & Payments");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (route: string) => () => {
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      await revoke();
      localStorage.clear();
      window.location.href = LOGOUT_URL;
    } catch (err) {
      console.log(err);
      localStorage.clear();
      window.location.href = LOGOUT_URL;
    }
  };

  useEffect(() => {
    if (location.pathname === REQUESTS) {
      setTitle("Service Requests");
    } else if (location.pathname === BASE) {
      setTitle("Loans & Payments");
    }
  }, [location.pathname]);

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton onClick={handleClick(BASE)}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Loans & Payments" />
          </ListItemButton>
          <ListItemButton onClick={handleClick(REQUESTS)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Service Requests" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          width: "50vw",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
