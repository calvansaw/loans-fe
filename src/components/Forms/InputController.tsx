import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface InputControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
  type?: string;
}

const InputController = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  fieldState,
  label,
  type = "text",
}: InputControllerProps<TFieldValues, TName>) => {
  return (
    <FormControl fullWidth error={fieldState.invalid}>
      <FormLabel>{label}</FormLabel>
      <Input fullWidth type={type} {...field} />
      <FormHelperText sx={{ ml: 0 }}>
        {fieldState.error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default InputController;
