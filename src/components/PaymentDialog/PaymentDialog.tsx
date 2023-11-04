import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { LoanInterface } from "../../@types/loans";
import { useMutation, useQueryClient } from "react-query";
import { updateLoan } from "../../services/loans";
import { GET_LOANS } from "../../constants/query";
import { CircularProgress } from "@mui/material";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  data: LoanInterface;
  index: number;
}

const convertDecimal = (input: number) => parseFloat(input.toFixed(2));

const PaymentDialog = ({ open, handleClose, data, index }: DialogProps) => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState(0);

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
    const newOutstandingAmt = data.outstandingAmount - amount;
    const newLoanData = {
      ...data,
      outstandingAmount: newOutstandingAmt,
      redeemed: newOutstandingAmt <= 0,
    };
    const payload = { index, paymentAmount: amount, loan: newLoanData };
    mutate(payload);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment for loan</DialogTitle>
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
            value={amount}
            onChange={handleChange}
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
