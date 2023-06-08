import { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, LinearProgress } from "@mui/material";
import PageContainer from "../src/components/container/PageContainer";
import SalesOverview from "@src/components/dashboard/SalesOverview";
import SocialCount from "@src/components/dashboard/SocialCount";
import FullLayout from "@src/layouts/full/FullLayout";
import { useDashboardFetcher } from "@services/hooks/useDashboard";

function HomeComponent() {
  const [loading, setLoading] = useState(true);
  const { status, response, getDashboard } = useDashboardFetcher();
  const [month, setMonth] = useState("05");

  useEffect(() => {
    getDashboard({
      type: "monthly",
      page_id: "105701022801307",
      date_range: [`2023-${month}-01`, `2023-${month}-31`]
    });
  }, []);

  const { data = {} } = response || {};

  if (status === "pending") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          marginTop: "200px"
        }}
      >
        <LinearProgress />
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title="Smartdash" description="Smartdash">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={3}>
            <SocialCount stats={data?.total_post} index={0} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <SocialCount stats={data?.total_comment} index={1} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <SocialCount stats={data?.total_reaction} index={2} />
          </Grid>
          <Grid item xs={6} lg={3}>
            <SocialCount stats={data?.total_share} index={3} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

HomeComponent.getLayout = function getLayout(page: any) {
  return <FullLayout>{page}</FullLayout>;
};

export default HomeComponent;

export async function getServerSideProps(context: any) {
  const token = context.req.cookies["access_token"];

  if (!token) {
    return {
      redirect: {
        destination: "/authentication/login",
        permanent: false
      }
    };
  }

  return { props: {} };
}
