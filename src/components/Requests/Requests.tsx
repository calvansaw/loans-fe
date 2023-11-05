import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useCheckLogin from "../../hooks/useCheckLogin";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { GET_REQUESTS } from "../../constants/query";
import { getRequests } from "../../services/requests";
import { REQUEST_TYPES } from "../../constants/requests";
import { RequestInterface } from "../../@types/request";
import RequestsTable from "./RequestsTable";

const Requests = () => {
  const { isAdmin } = useCheckLogin();
  const { data } = useQuery(GET_REQUESTS, getRequests);
  const [createAccountRequests, setCreateAccountRequests] = useState<
    RequestInterface[]
  >([]);
  const [createLoanRequests, setCreateLoanRequests] = useState<
    RequestInterface[]
  >([]);

  useEffect(() => {
    if (data?.data?.list) {
      const createAccountList: RequestInterface[] = [];
      const createLoanList: RequestInterface[] = [];

      data.data.list.forEach((r: RequestInterface) => {
        if (r.requestType === REQUEST_TYPES.CREATE_ACCOUNT) {
          createAccountList.push(r);
        } else if (r.requestType === REQUEST_TYPES.CREATE_LOAN) {
          createLoanList.push(r);
        }
      });

      setCreateAccountRequests(createAccountList);
      setCreateLoanRequests(createLoanList);
    }
  }, [data?.data?.list]);

  console.log("data: ", data?.data);
  console.log("isAdmin: ", isAdmin);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <Button
            sx={{ width: "200px" }}
            variant="contained"
            onClick={() => {}}
          >
            Create Account
          </Button>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Button
            sx={{ width: "200px" }}
            variant="contained"
            color="secondary"
            onClick={() => {}}
          >
            Create Loan
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <RequestsTable
              rows={createAccountRequests}
              requestType={REQUEST_TYPES.CREATE_ACCOUNT}
              isAdmin={isAdmin}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <RequestsTable
              rows={createLoanRequests}
              requestType={REQUEST_TYPES.CREATE_LOAN}
              isAdmin={isAdmin}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Requests;
