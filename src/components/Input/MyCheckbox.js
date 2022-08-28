import { Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";

const MyCheckbox = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <FormControlLabel
          control={<Checkbox required {...field} {...props} />}
          label={children}
        />
      </label>
    </>
  );
};

export default MyCheckbox;
