import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AccountInterface } from "../../@types/account";
import { calculateTotal } from "../../helpers/utils";

interface UserInfoProps {
  account: AccountInterface | null;
  isAdmin: boolean;
}

const UserInfo = ({ account, isAdmin }: UserInfoProps) => {
  const {
    homeLoanSGD,
    homeLoanUSD,
    carLoanSGD,
    carLoanUSD,
    studyLoanSGD,
    studyLoanUSD,
  } = calculateTotal(account?.loans || []);
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 240,
      }}
    >
      {account ? (
        <>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {account?.sub}
          </Typography>
          <Typography variant="h5" component="div">
            {account?.name}
          </Typography>
        </>
      ) : isAdmin ? (
        <Alert severity="info">Select an account</Alert>
      ) : (
        <Alert severity="error">Account unavailable</Alert>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Home loan</TableCell>
            <TableCell>Car loan</TableCell>
            <TableCell>Study loan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>SGD</TableCell>
            <TableCell>{homeLoanSGD}</TableCell>
            <TableCell>{carLoanSGD}</TableCell>
            <TableCell>{studyLoanSGD}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>USD</TableCell>
            <TableCell>{homeLoanUSD}</TableCell>
            <TableCell>{carLoanUSD}</TableCell>
            <TableCell>{studyLoanUSD}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserInfo;
