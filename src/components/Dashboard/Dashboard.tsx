import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { getLoans } from "../../services/loans";
import Loans from "../Loans/Loans";
import Payments from "../Payments/Payments";
import { GET_LOANS } from "../../constants/query";

const Dashboard = () => {
  const { data } = useQuery(GET_LOANS, getLoans);
  console.log("data: ", data?.data);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Payments rows={data?.data?.list[0]?.payments} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Loans rows={data?.data.list[0]?.loans} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
