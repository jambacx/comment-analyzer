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
  CircularProgress
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import requireAuth from "@components/auth/requireAuth";

import moment from "moment";
import FullLayout from "../src/layouts/full/FullLayout";
import DashboardCard from "../src/components/shared/DashboardCard";
import TablesHead from "./sub-components/ReportHead";
import { useReportFetcher } from "@services/hooks/useReport";

function ReportsComponent() {
  const { status, response, list } = useReportFetcher();
  const [value, setValue] = useState<string>("1");

  useEffect(() => {
    list({
      page: 1,
      page_id: "105701022801307",
      limit: 100,
      category: "default",
      date_range: ["2023-02-1", "2023-03-21"]
    });
  }, []);

  const { posts = [] } = response || {};

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
        <CircularProgress />
      </Box>
    );

  const checkLabel = (percentage: number) => {
    return "textSecondary";
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <DashboardCard title="Тайлан">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab value="1" label="Нийтлэлүүд" />
            {/* <Tab value="2" label="Сэтгэгдлүүд" /> */}
          </TabList>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabPanel value="1">
              <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: "nowrap",
                  mt: 2
                }}
              >
                <TablesHead />
                <TableBody>
                  {posts.map((report: any, index: number) => (
                    <TableRow key={report.name}>
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
                        <Typography
                          color={checkLabel(parseInt(report.confidence))}
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            fontSize: "13px"
                          }}
                        >
                          {report.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <Box>
                            <Tooltip title={report.id}>
                              <Typography
                                color="text"
                                sx={{
                                  fontSize: "13px",
                                  whiteSpace: "pre-wrap",
                                  wordWrap: "break-word",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  maxWidth: "80ch"
                                }}
                              >
                                {report?.message}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle2"
                          fontWeight={400}
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px"
                          }}
                        >
                          {report.comments}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            bgcolor: "#1B1B1B",
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
                            {report.reactions}
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
                          {moment
                            .unix(report.created_time)
                            .format("MM/DD/YYYY")}
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
                              href={`https://www.facebook.com/${report.id}`}
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
            </TabPanel>
            <TabPanel value="2">
              <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: "nowrap",
                  mt: 2
                }}
              >
                <TablesHead />
                <TableBody>
                  {posts.map((report: any, index: number) => (
                    <TableRow key={report.name}>
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
                        <Typography
                          color={checkLabel(parseInt(report.confidence))}
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            fontSize: "13px"
                          }}
                        >
                          {report.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <Box>
                            <Tooltip title={report.id}>
                              <Typography
                                color="text"
                                sx={{
                                  fontSize: "13px",
                                  whiteSpace: "pre-wrap",
                                  wordWrap: "break-word",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  maxWidth: "80ch"
                                }}
                              >
                                {report?.message}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle2"
                          fontWeight={400}
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px"
                          }}
                        >
                          {report.comments}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            bgcolor: "#1B1B1B",
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
                            {report.reactions}
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
                          {report?.share_count}
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
                              href={`https://www.facebook.com/${report.id}`}
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
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </DashboardCard>
  );
}
ReportsComponent.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

const Reports = requireAuth(ReportsComponent);

export default Reports;

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
