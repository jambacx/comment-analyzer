import { TableRow, TableCell, Typography, TableHead } from "@mui/material";
import { type ReactElement, useEffect } from "react";

interface FormData {
  email: string;
  password: string;
}

export const PostHead = () => {
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
            Post
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            Category
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" fontWeight={600}>
            Date
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="subtitle2" fontWeight={600}>
            Action
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PostHead;
