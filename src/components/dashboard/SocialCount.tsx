import { Grid, Stack, Typography, Avatar } from "@mui/material";
import {
  IconMailFast,
  IconFileLike,
  IconShare,
  IconMessage2
} from "@tabler/icons-react";

import DashboardCard from "../../../src/components/shared/DashboardCard";

const SocialCount = ({ stats, index }: { stats: number; index: number }) => {
  const colors = ["#EEE6FF", "#D9F6FA", "#DEE7FF", "#FEF6E1"];
  const iconColors = ["#875FDF", "#45C8D5", "#2F5BF9", "#F2C964"];
  const names = ["Нийтлэл", "Сэтгэгдэл", "Реакц", "Хуваалцах"];
  const iconsList = [
    <IconMailFast width={20} color={iconColors[index]} />,
    <IconMessage2 width={20} color={iconColors[index]} />,
    <IconFileLike width={20} color={iconColors[index]} />,
    <IconShare width={20} color={iconColors[index]} />
  ];

  return (
    <DashboardCard title={names[index]}>
      <Grid container spacing={3}>
        <Grid item xs={2} sm={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ bgcolor: colors[index], width: 30, height: 30 }}>
              {iconsList[index]}
            </Avatar>
          </Stack>
        </Grid>
        <Grid item xs={10} sm={10}>
          <Typography variant="h3" fontWeight="700">
            {stats}
          </Typography>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default SocialCount;
