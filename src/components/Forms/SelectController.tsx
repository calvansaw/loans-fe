import Select, { GroupBase, OptionsOrGroups } from "react-select";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";

interface SelectControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
  options?:
    | OptionsOrGroups<
        PathValue<TFieldValues, TName>,
        GroupBase<PathValue<TFieldValues, TName>>
      >
    | undefined;
}

const SelectController = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  fieldState,
  label,
  options,
}: SelectControllerProps<TFieldValues, TName>) => {
  return (
    <FormControl fullWidth error={fieldState.invalid}>
      <FormLabel>{label}</FormLabel>
      <Select {...field} options={options} />
      <FormHelperText sx={{ ml: 0 }}>
        {fieldState.error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectController;
