import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import { GET_REQUESTS } from "../../constants/query";
import { RequestInterface } from "../../@types/request";
import { updateRequests } from "../../services/requests";
import { REQUEST_APPROVAL, REQUEST_TYPES } from "../../constants/requests";

interface UpdateRequestDialogProps {
  open: boolean;
  handleClose: () => void;
  data: RequestInterface;
}

const UpdateRequestDialog = ({
  open,
  handleClose,
  data,
}: UpdateRequestDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateRequests, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_REQUESTS);
      handleClose();
    },
  });

  const handleConfirm = (approval: string) => () => {
    const payload = { ...data, requestApproval: approval };
    console.log(payload);
    mutate(payload);
  };

  const transformText = (requestType: string) => {
    if (requestType === REQUEST_TYPES.CREATE_ACCOUNT) {
      return "Create account";
    } else if (requestType === REQUEST_TYPES.CREATE_LOAN) {
      return "Create loan";
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Approve request</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText sx={{ pb: 3 }}>
            <Typography>Account ID: {data.sub}</Typography>
            <Typography>
              Request type: {transformText(data.requestType)}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "80px" }}
            color="error"
            onClick={handleConfirm(REQUEST_APPROVAL.REJECTED)}
          >
            {isLoading ? <CircularProgress size={20} /> : "Reject"}
          </Button>
          <Button
            sx={{ width: "80px" }}
            color="success"
            disabled={isLoading}
            onClick={handleConfirm(REQUEST_APPROVAL.APPROVED)}
          >
            {isLoading ? <CircularProgress size={20} /> : "Approve"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateRequestDialog;
