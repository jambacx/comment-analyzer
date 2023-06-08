import React, { useState, useEffect } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const PickersRange: React.FC = () => {
  const [value, setValue] = React.useState<[Date, Date]>([
    new Date("2023-05-01"),
    new Date("2023-06-01")
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDateRangePicker
        startText="Start Date"
        endText="End Date"
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
        renderInput={(startProps: any, endProps: any) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default PickersRange;
