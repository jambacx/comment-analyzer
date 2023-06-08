import { TableRow, TableCell, Typography, TableHead } from "@mui/material";
import { type ReactElement, useEffect } from "react";

interface FormData {
  email: string;
  password: string;
}

export const ReportHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            No
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            Category
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" fontWeight={600}>
            Post
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" fontWeight={600}>
            Comments
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            Reactions
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" fontWeight={600}>
            Date
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ReportHead;
