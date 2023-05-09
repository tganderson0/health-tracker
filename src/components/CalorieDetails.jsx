import {
  Card,
  Title,
  Subtitle,
  Grid,
  Col,
  BarChart,
} from "@tremor/react";

import moment from "moment";
import MealCard from "./MealCard";

const chartdata = [
  {
    date: moment().subtract({ "days": 5 }).format("MMM D"),
    Calories: 2050,
  },
  {
    date: moment().subtract({ "days": 4 }).format("MMM D"),
    Calories: 2500,
  },
  {
    date: moment().subtract({ "days": 3 }).format("MMM D"),
    Calories: 1400,
  },
  {
    date: moment().subtract({ "days": 2 }).format("MMM D"),
    Calories: 1800,
  },
  {
    date: moment().subtract({ "days": 1 }).format("MMM D"),
    Calories: 2000,
  },
  {
    date: moment().format("MMM D"),
    Calories: 1418,
  },
];

const dataFormatter = (number) => {
  return `${Intl.NumberFormat("us").format(number).toString()} cal`;
}

export default function CalorieDetails() {
  return (
    <div className="mt-6">
      <Grid numColsLg={4} numColsMd={2} className="gap-6 mt-6">
        <MealCard meal={'Breakfast'} />
        <MealCard meal={'Lunch'} />
        <MealCard meal={'Dinner'} />
        <MealCard meal={'Snacks'} />
      </Grid>

      <Card className="h-full mt-6">
        <Title>Weekly Calories</Title>
        <Subtitle>
          Total calories for each day of the previous 7 days
        </Subtitle>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="date"
          categories={["Calories"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
}