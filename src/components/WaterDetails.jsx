import {
  Card,
  Title,
  Subtitle,
  Grid,
  BarChart,
} from "@tremor/react";

import moment from "moment";
import WaterCard from "./WaterCard";
import AverageWaterCard from "./AverageWaterCard";

const chartdata = [
  {
    date: moment().subtract({ "days": 5 }).format("MMM D"),
    "fl oz": 120,
  },
  {
    date: moment().subtract({ "days": 4 }).format("MMM D"),
    "fl oz": 125,
  },
  {
    date: moment().subtract({ "days": 3 }).format("MMM D"),
    "fl oz": 123,
  },
  {
    date: moment().subtract({ "days": 2 }).format("MMM D"),
    "fl oz": 120,
  },
  {
    date: moment().subtract({ "days": 1 }).format("MMM D"),
    "fl oz": 44,
  },
  {
    date: moment().format("MMM D"),
    "fl oz": 130,
  },
];

const dataFormatter = (number) => {
  return `${Intl.NumberFormat("us").format(number).toString()} fl oz`;
}

export default function WaterDetails() {
  return (
    <div className="mt-6">
      <Grid numColsLg={2} numColsMd={2} className="gap-6 mt-6">
        <WaterCard />
        <AverageWaterCard />
      </Grid>

      <Card className="h-full mt-6">
        <Title>Weekly Water Intake</Title>
        <Subtitle>
          Total water intake for each day of the previous 7 days
        </Subtitle>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="date"
          categories={["fl oz"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}