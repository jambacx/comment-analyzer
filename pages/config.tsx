import { type ReactElement, useEffect } from "react";
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
  LinearProgress
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

import moment from "moment";
import FullLayout from "../src/layouts/full/FullLayout";
import DashboardCard from "../src/components/shared/DashboardCard";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { usePostFetcher } from "@services/hooks/usePosts";
import TablesHead from "./sub-components/PostHead";
import requireAuth from "@components/auth/requireAuth";

function ConfigsComponent() {
  const { status, response, list } = usePostFetcher();

  useEffect(() => {
    list({
      page: 1,
      page_id: "105701022801307",
      limit: 100,
      category: "default",
      date_range: ["2023-03-1", "2023-03-21"]
    });
  }, []);

  const { posts = [] } = response || {};

  if (status === "pending")
    return (
      <Box sx={{ width: "100%" }}>
        {status === "pending" && <LinearProgress />}
      </Box>
    );

  return (
    <DashboardCard title="Нийтлэлүүд">
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
              <TableRow key={post.name}>
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
                        <Typography
                          color="text"
                          sx={{
                            fontSize: "13px"
                          }}
                        >
                          {post?.message?.length > 100
                            ? `${post?.message?.substring(0, 100)}...`
                            : post?.message}
                        </Typography>
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
      </Box>
    </DashboardCard>
  );
}

ConfigsComponent.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

const Configs = requireAuth(ConfigsComponent);

export default Configs;
