import { useEffect } from "react";
import { Box, LinearProgress, Grid } from "@mui/material";

import FullLayout from "@src/layouts/full/FullLayout";
import DashboardCard from "@src/components/shared/DashboardCard";
import { usePostFetcher } from "@services/hooks/usePosts";
import { useRouter } from "next/router";
import SocialCount from "@components/dashboard/SocialCount";

export default function Post() {
  const { status, response, fetchDetail } = usePostFetcher();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchDetail({
        page_id: "105701022801307",
        post_id: id
      });
    }
  }, [id]);

  const { data = {} } = response || {};

  if (status === "pending")
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  let base64Image = null;
  if (data?.binary_image) {
    base64Image = btoa(
      new Uint8Array(data?.binary_image).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  }

  return (
    <DashboardCard hasBack={true} title={`Нийтлэл дэлгэрэнгүй`}>
      <Box mt={6}>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={4}>
            <SocialCount stats={data?.total_reactions} index={2} />
          </Grid>
          <Grid item xs={6} lg={4}>
            <SocialCount stats={data?.total_comments} index={1} />
          </Grid>
          <Grid item xs={6} lg={4}>
            <SocialCount stats={parseInt(data?.total_shares)} index={3} />
          </Grid>
        </Grid>
        {base64Image && (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={`data:image/jpeg;base64,${base64Image}`}
              alt="Post"
              style={{ maxWidth: "60%" }}
            />
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
}

Post.getLayout = function getLayout(page: any) {
  return <FullLayout>{page}</FullLayout>;
};

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
