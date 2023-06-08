import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { Grid, Box } from "@mui/material";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  const [month, setMonth] = React.useState("1");

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const success = theme.palette.success.main;
  //   const third = theme.palette.third.main;
  //   const fourth = theme.palette.fourth.main;

  // chart

  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Nunito', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true
      },
      height: 370
    },
    colors: [success, error, primary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all"
      }
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"]
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    yaxis: {
      tickAmount: 4
    },
    xaxis: {
      categories: ["Mar", "Apr", "May"],
      axisBorder: {
        show: false
      }
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false
    }
  };
  const seriescolumnchart: any = [
    {
      name: "Эерэг",
      data: [355, 390, 300]
    },
    {
      name: "Дундаж",
      data: [280, 250, 325]
    },
    {
      name: "Сөрөг",
      data: [280, 250, 325]
    }
  ];

  const donutOptionsColumnchart: ApexOptions = {
    stroke: { width: 0 },
    labels: ["Эерэг", "Cөрөг", "Дундаж"],
    colors: [success, error, primary],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: "bottom",
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "1.2rem"
            },
            value: {
              fontSize: "1.2rem",
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: "1.0rem",
              label: "Ерөнхий",
              formatter: () => "31%",
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  };
  const donutSeriescolumnchart: any = [38, 40, 25];

  return (
    <DashboardCard
      title="Дэлгэрэнгүй"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </Select>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="370px"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Chart
              options={donutOptionsColumnchart}
              series={donutSeriescolumnchart}
              type="donut"
              height={400}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default SalesOverview;
