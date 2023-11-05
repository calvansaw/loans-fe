import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { AccountInterface } from "../../@types/account";

interface UserInfoProps {
  account: AccountInterface | null;
  isAdmin: boolean;
}

const UserInfo = ({ account, isAdmin }: UserInfoProps) => {
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
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {account?.email}
          </Typography>{" "}
        </>
      ) : isAdmin ? (
        <Alert severity="info">Select an account</Alert>
      ) : (
        <Alert severity="error">Account unavailable</Alert>
      )}
    </Paper>
  );
};

export default UserInfo;
