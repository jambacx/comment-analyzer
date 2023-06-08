import { type ReactElement, useEffect, useState } from "react";
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
  LinearProgress,
  CircularProgress
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Pagination from "@mui/material/Pagination";

import moment from "moment";
import FullLayout from "../src/layouts/full/FullLayout";
import DashboardCard from "../src/components/shared/DashboardCard";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { useCommentFetcher } from "@services/hooks/useComments";
import { TablesHead } from "./sub-components/TableHead";
import PickersRange from "./sub-components/PickersRange";
import requireAuth from "@components/auth/requireAuth";
import { useDispatch } from "react-redux";

function CommentsComponent() {
  const { status, response, list } = useCommentFetcher();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    list({
      page: page,
      page_id: "105701022801307",
      limit: 100,
      category: "default",
      date_range: ["2023-03-1", "2023-03-21"]
    });
  }, [page]);

  const { comments = [] } = response || {};
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

  const checkLabel = (percentage: number) => {
    return "textSecondary";
  };

  const checkType = (label: string) => {
    if (label === "positive") {
      return "lightGreen";
    } else if (label === "negative") {
      return "red";
    } else if (label === "neutral") return "#5D87FF";

    return "#7C7C7C";
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <DashboardCard title="Сэтгэгдэлүүд">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <PickersRange />
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TablesHead />
          <TableBody>
            {comments.map((comment: any, index: number) => (
              <TableRow key={comment.name}>
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
                      <Tooltip title={comment.id}>
                        <Typography
                          color="text"
                          sx={{
                            fontSize: "13px",
                            whiteSpace: "pre-wrap"
                          }}
                        >
                          {comment?.comment?.length > 70
                            ? comment.comment.match(/.{1,80}/g).join("\n")
                            : comment?.comment}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    color={checkLabel(parseInt(comment.confidence))}
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{
                      fontSize: "13px"
                      // backgroundColor: "#f2f2f2" // replace with your desired color
                    }}
                  >
                    {comment.confidence}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor: checkType(comment.label),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20
                    }}
                  >
                    <Typography
                      color="white"
                      variant="subtitle2"
                      fontWeight={400}
                      sx={{
                        fontSize: "13px",
                        textAlign: "center"
                      }}
                    >
                      {comment.label}
                    </Typography>
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
                    {moment.unix(comment.created_time).format("MM/DD/YYYY")}
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
                        href={`https://www.facebook.com/${comment.id}`}
                        target="_blank"
                      >
                        <FacebookIcon />
                      </a>
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
            count={pagination?.page_count}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
}

CommentsComponent.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

const Comments = requireAuth(CommentsComponent);
export default Comments;

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
