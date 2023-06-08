import { styled } from "@mui/material/styles";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type Props = TextFieldProps & {
  error: boolean;
};

const CustomTextField = styled(
  React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { error, ...other } = props;
    return <TextField error={error} ref={ref} {...other} />;
  })
)(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.primary,
    opacity: "0.8"
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.primary,
    opacity: "1"
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200]
  }
}));

export default CustomTextField;
