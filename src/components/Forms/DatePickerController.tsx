import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface DatePickerControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
}

const DatePickerController = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  fieldState,
  label,
}: DatePickerControllerProps<TFieldValues, TName>) => {
  return (
    <FormControl fullWidth error={fieldState.invalid}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        placeholderText="Select date"
        dateFormat="dd/MM/yyyy"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
      />
      <FormHelperText sx={{ ml: 0 }}>
        {fieldState.error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default DatePickerController;
