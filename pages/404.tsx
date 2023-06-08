import { useEffect, type ReactElement } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import BlankLayout from "../src/layouts/blank/BlankLayout";
import router from "next/router";

const Error = () => {
  useEffect(() => {
    router.replace("/authentication/login");
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography align="center" variant="h1" mb={4}>
          Opps!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          This page you are looking for could not be found.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          href="/authentication/login"
          disableElevation
        >
          Go Back to Login
        </Button>
      </Container>
    </Box>
  );
};
export default Error;

Error.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};
