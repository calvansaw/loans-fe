import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { LoanInterface } from "../../@types/loan";
import { useMutation, useQueryClient } from "react-query";
import { updateLoan } from "../../services/loans";
import { GET_LOANS } from "../../constants/query";
import { convertDecimal } from "../../helpers/utils";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  data: LoanInterface;
  index: number;
}

const PaymentDialog = ({ open, handleClose, data, index }: DialogProps) => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useMutation(updateLoan, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_LOANS);
      handleClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = convertDecimal(parseFloat(e.target.value));
    setAmount(newAmount);
  };

  const handleConfirm = () => {
    if (amount > 0) {
      setError(false);
      const newOutstandingAmt = data.outstandingAmount - amount;
      const newLoanData = {
        ...data,
        outstandingAmount: newOutstandingAmt,
        redeemed: newOutstandingAmt <= 0,
      };
      const payload = { index, paymentAmount: amount, loan: newLoanData };
      mutate(payload);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment for loan</DialogTitle>
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
            <Typography>
              {data?.loanTitle} - {data?.loanId}
            </Typography>
            <Typography>({data?.currency})</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Payment"
            variant="outlined"
            type="number"
            InputLabelProps={{ shrink: true }}
            FormHelperTextProps={{ sx: { ml: 0 } }}
            value={amount}
            onChange={handleChange}
            error={error}
            helperText={error && "Payment amount must be more than 0"}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ width: "80px" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ width: "80px" }}
            disabled={isLoading}
            onClick={handleConfirm}
          >
            {isLoading ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentDialog;
