import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { getLoans } from "../../services/loans";
import Loans from "../Loans/Loans";
import Payments from "../Payments/Payments";
import { GET_LOANS } from "../../constants/query";
import UserInfo from "../UserInfo/UserInfo";
import useCheckLogin from "../../hooks/useCheckLogin";
import { useEffect, useState } from "react";
import { AccountInterface } from "../../@types/account";

const Dashboard = () => {
  const { isAdmin } = useCheckLogin();
  const { data } = useQuery(GET_LOANS, getLoans);
  const [account, setAccount] = useState<AccountInterface | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setAccount(data?.data?.list[0]);
    } else {
      setAccount(null);
    }
  }, [data, isAdmin]);

  console.log("data: ", data?.data);
  console.log("isAdmin: ", isAdmin);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <UserInfo isAdmin={isAdmin} account={account} />
        </Grid>
        <Grid item xs={12} md={4} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Payments rows={account?.payments} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Loans rows={account?.loans} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
