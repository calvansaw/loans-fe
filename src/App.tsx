import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import RouteRenderer from "./routers/RouteRenderer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <RouteRenderer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
