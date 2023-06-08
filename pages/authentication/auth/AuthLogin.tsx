import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress
} from "@mui/material";

import CustomTextField from "@src/components/forms/theme-elements/CustomTextField";

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  register: UseFormRegister<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  errors: FieldErrors<FormData>;
  loading: boolean;
}

const AuthLogin = ({
  title,
  subtitle,
  subtext,
  register,
  onSubmit,
  errors,
  loading
}: loginType) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      password: (form.elements.namedItem("password") as HTMLInputElement)?.value
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email && "Мэйл хаяг буруу байна."}
            {...register("email", { required: true })}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password && "Нууц үг буруу байна."}
            {...register("password", { required: true })}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        ></Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Нэвтрэх
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
