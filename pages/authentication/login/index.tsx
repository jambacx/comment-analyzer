import { type ReactElement, useEffect } from "react";
import { Grid, Box, Card } from "@mui/material";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";

import PageContainer from "../../../src/components/container/PageContainer";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useLogin } from "@services/hooks/useLogin";

interface FormData {
  email: string;
  password: string;
}

const Login2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>();
  const { status, response, login } = useLogin();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    await login(data);

    if (response?.data) {
      if (response.data.token) {
        const token = response?.data?.token;
        localStorage.setItem("access_token", token);
      }
    } else if (response) {
      const errorMessage = response.error || "An unexpected error occurred";
      setError("email", { type: "server", message: errorMessage });
      setError("password", { type: "server", message: errorMessage });
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3"
          }
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                loading={status === "pending"}
                onSubmit={onSubmit}
                // register={register}
                // errors={errors}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;

Login2.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
