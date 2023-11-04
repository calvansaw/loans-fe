import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import RouteRenderer from "./routers/RouteRenderer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "react-query";

const defaultTheme = createTheme();
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouteRenderer />
        </QueryClientProvider>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
