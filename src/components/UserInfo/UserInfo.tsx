import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AccountInterface } from "../../@types/account";

interface UserInfoProps {
  account?: AccountInterface;
}

const UserInfo = ({ account }: UserInfoProps) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 240,
      }}
    >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {account?.sub}
      </Typography>
      <Typography variant="h5" component="div">
        {account?.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {account?.email}
      </Typography>
    </Paper>
  );
};

export default UserInfo;
