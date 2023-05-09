import {
  Card,
  Title,
  LineChart,
  Button,
} from "@tremor/react";

import moment from "moment/moment";

const chartdata = [
  {
    date: moment().subtract({"days": 5}).format("MMM D"),
    Weight: 190.6,
  },
  {
    date: moment().subtract({"days": 4}).format("MMM D"),
    Weight: 187.8,
  },
  {
    date: moment().subtract({"days": 3}).format("MMM D"),
    Weight: 187.8,
  },
  {
    date: moment().subtract({"days": 2}).format("MMM D"),
    Weight: 187,
  },
  {
    date: moment().subtract({"days": 1}).format("MMM D"),
    Weight: 186.4,
  },
  {
    date: moment().format("MMM D"),
    Weight: 184.2,
  },
];

const dataFormatter = (number) => {
  return `${Intl.NumberFormat("us").format(number).toString()}`;
}

const WeightCard = () => (
  <Card>
    <Title>Weight Trend</Title>
    <Button className="mt-2" variant="secondary">Add Weight</Button>
    <LineChart
      className="mt-6 h-80"
      data={chartdata}
      index="date"
      categories={["Weight"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={40}
      autoMinValue={true}
    />
  </Card>
);

export default WeightCard 