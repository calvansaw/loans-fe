import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AUTHORIZE_URL } from "../constants/urls";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { token } from "../services/auth";
import { BASE } from "../constants/routes";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authCode = params.get("code");
    if (authCode) {
      token(authCode).then((res) => {
        localStorage.setItem("id_token", res.data.id_token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        navigate(BASE);
      });
    }
  }, []);

  return (
    <>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap={6}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Typography component="h1" variant="h5">
          Welcome to My Bank
        </Typography>
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href={AUTHORIZE_URL}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Login;
