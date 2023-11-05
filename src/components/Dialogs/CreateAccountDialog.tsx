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
import { AccountRequestData } from "../../@types/request";
import InputController from "../Forms/InputController";
import { REQUEST_TYPES } from "../../constants/requests";

interface CreateAccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

const CreateAccountDialog = ({
  open,
  handleClose,
}: CreateAccountDialogProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<AccountRequestData>({
    defaultValues: {
      name: "",
      email: "",
    },
    shouldUnregister: true,
  });

  const { mutate, isLoading } = useMutation(createRequests, {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_REQUESTS);
      handleClose();
    },
  });

  const onSubmit = (data: AccountRequestData) => {
    const payload = {
      requestType: REQUEST_TYPES.CREATE_ACCOUNT,
      requestData: data,
    };
    mutate(payload);
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog disablePortal open={open} onClose={handleClose}>
        <DialogTitle>Create account</DialogTitle>
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
        <DialogContent sx={{ width: "300px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState }) => (
                  <InputController
                    field={field}
                    fieldState={fieldState}
                    label="Name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <InputController
                    field={field}
                    fieldState={fieldState}
                    label="Email"
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

export default CreateAccountDialog;
