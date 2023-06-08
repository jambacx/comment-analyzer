import { type ReactElement, useEffect, useRef, useState } from "react";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
  CircularProgress,
  LinearProgress
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import FullLayout from "../src/layouts/full/FullLayout";
import DashboardCard from "../src/components/shared/DashboardCard";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { usePostFetcher } from "@services/hooks/usePosts";
import TablesHead from "./sub-components/PostHead";
import LoadingBar from "react-top-loading-bar";
import PickersRange from "./sub-components/PickersRange";
import requireAuth from "@components/auth/requireAuth";

function PostsComponent() {
  const { status, response, list } = usePostFetcher();
  const ref = useRef<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    list({
      page: page,
      page_id: "105701022801307",
      limit: 15,
      category: "default",
      date_range: ["2023-05-01", "2023-06-01"]
    });
  }, [page]);

  const { posts = [] } = response || {};
  const { pagination = [] } = response || {};

  if (status === "pending")
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = Number.isFinite(pagination?.total)
    ? Math.ceil(pagination.total / 15)
    : 0;

  return (
    <>
      <LoadingBar color="#f11946" ref={ref} />
      <DashboardCard title="Нийтлэлүүд">
        <>
          <PickersRange />
          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2
              }}
            >
              <TablesHead />
              <TableBody>
                {posts.map((post: any, index: number) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Link
                        underline="none"
                        href="#"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500"
                        }}
                      >
                        {index + 1}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Box>
                          <Tooltip title={post.id}>
                            <Link
                              underline="none"
                              href={`/posts/${post?.id}`}
                              sx={{
                                fontSize: "13px",
                                fontWeight: "500"
                              }}
                            >
                              <Typography
                                color="textSecondary"
                                sx={{
                                  fontSize: "13px"
                                }}
                              >
                                {post?.message?.length > 100
                                  ? `${post?.message?.substring(0, 100)}...`
                                  : post?.message}
                              </Typography>
                            </Link>
                          </Tooltip>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                        sx={{
                          fontSize: "13px"
                        }}
                      >
                        {post.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                        sx={{
                          fontSize: "13px"
                        }}
                      >
                        {moment.unix(post.created_time).format("MM/DD/YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          width: 80
                        }}
                      >
                        <IconButton color="primary">
                          <a
                            href={`https://www.facebook.com/${post.id}`}
                            target="_blank"
                          >
                            <FacebookIcon />
                          </a>
                        </IconButton>
                        <IconButton color="secondary">
                          <HistoryRoundedIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px"
              }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </>
      </DashboardCard>
    </>
  );
}

PostsComponent.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

const Posts = requireAuth(PostsComponent);

export default Posts;

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
