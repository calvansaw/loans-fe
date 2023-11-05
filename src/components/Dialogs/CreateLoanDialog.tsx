import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Grid from "@mui/material/Grid";
import { useMutation, useQueryClient } from "react-query";
import { GET_REQUESTS } from "../../constants/query";
import { createRequests } from "../../services/requests";
import { Controller, useForm } from "react-hook-form";
import { LoanRequestData } from "../../@types/request";
import InputController from "../Forms/InputController";
import { REQUEST_TYPES } from "../../constants/requests";
import SelectController from "../Forms/SelectController";
import { LOAN_TYPES } from "../../constants/loans";

interface CreateLoanDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface LoanFormValues
  extends Omit<LoanRequestData, "loanType" | "currency"> {
  loanType: { label: string; value: string };
  currency: { label: string; value: string };
}

const CreateLoanDialog = ({ open, handleClose }: CreateLoanDialogProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<LoanFormValues>({
    defaultValues: {
      loanTitle: "",
      startDate: "",
      endDate: "",
    },
    shouldUnregister: true,
    criteriaMode: "all",
  });

  const { mutate, isLoading } = useMutation(createRequests, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_REQUESTS);
      handleClose();
    },
  });

  const onSubmit = (data: LoanFormValues) => {
    alert(JSON.stringify(data));
    const payload = {
      requestType: REQUEST_TYPES.CREATE_LOAN,
      requestData: data,
    };
    // mutate(payload);
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog disablePortal open={open} onClose={handleClose}>
        <DialogTitle>Create loan</DialogTitle>
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
        <DialogContent sx={{ width: "600px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                name="loanTitle"
                control={control}
                rules={{ required: "Loan title is required" }}
                render={({ field, fieldState }) => (
                  <InputController
                    field={field}
                    fieldState={fieldState}
                    label="Loan title"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="loanType"
                control={control}
                rules={{ required: "Loan type is required" }}
                render={({ field, fieldState }) => (
                  <SelectController
                    field={field}
                    fieldState={fieldState}
                    label="Loan type"
                    options={[
                      { value: LOAN_TYPES.HOME_LOAN, label: "Home loan" },
                      { value: LOAN_TYPES.CAR_LOAN, label: "Car loan" },
                      { value: LOAN_TYPES.STUDY_LOAN, label: "Study loan" },
                    ]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="principalAmount"
                control={control}
                rules={{ required: "Principal amount is required" }}
                render={({ field, fieldState }) => (
                  <InputController
                    field={field}
                    fieldState={fieldState}
                    label="Principal amount"
                    type="number"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="currency"
                control={control}
                rules={{ required: "Currency is required" }}
                render={({ field, fieldState }) => (
                  <SelectController
                    field={field}
                    fieldState={fieldState}
                    label="Currency"
                    options={[
                      { value: "SGD", label: "SGD" },
                      { value: "USD", label: "USD" },
                    ]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="interestRate"
                control={control}
                rules={{ required: "Interest rate is required" }}
                render={({ field, fieldState }) => (
                  <InputController
                    field={field}
                    fieldState={fieldState}
                    label="Interest rate"
                    type="number"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button sx={{ width: "80px" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ width: "80px" }} disabled={isLoading} type="submit">
            {isLoading ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CreateLoanDialog;
