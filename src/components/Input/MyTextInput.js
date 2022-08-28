import { useField } from "formik";
import TextField from "@mui/material/TextField";

const MyTextInput = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      {/* <input className="text-input" {...field} {...props} /> */}
      <TextField
        margin="normal"
        fullWidth
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

export default MyTextInput;
