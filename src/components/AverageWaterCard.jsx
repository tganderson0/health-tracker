import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  AreaChart,
} from "@tremor/react";

import moment from "moment";

const weekAgoFormat = (momentDate) => {
  const now = moment();
  const weeks = now.diff(momentDate, "weeks");
  if (weeks === 0) return 'This week'
  return `${weeks} ${weeks === 1 ? ' week ago' : 'weeks ago'}`
}

const data = [
  {
    date: weekAgoFormat(moment().subtract({ "weeks": 5 })),
    "avg. fl oz": 120,
  },
  {
    date: weekAgoFormat(moment().subtract({ "weeks": 4 })),
    "avg. fl oz": 125,
  },
  {
    date: weekAgoFormat(moment().subtract({ "weeks": 3 })),
    "avg. fl oz": 123,
  },
  {
    date: weekAgoFormat(moment().subtract({ "weeks": 2 })),
    "avg. fl oz": 120,
  },
  {
    date: weekAgoFormat(moment().subtract({ "weeks": 1 })),
    "avg. fl oz": 44,
  },
  {
    date: weekAgoFormat(moment()),
    "avg. fl oz": 130,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()} fl oz`;

export default function AverageWaterCard() {
  return (
    <Card>
      <Flex alignItems="start">
        <Text>Average Daily Intake</Text>
        <BadgeDelta deltaType={'moderateIncrease'}>+5%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="truncate space-x-3"
      >
        <Metric>125 fl oz</Metric>
        <Text className="truncate">120 fl oz</Text>
      </Flex>
      <AreaChart
        className="mt-6 h-64"
        data={data}
        index="date"
        valueFormatter={valueFormatter}
        categories={['avg. fl oz']}
        colors={["blue"]}
        showXAxis={true}
        showGridLines={false}
        startEndOnly={true}
        showYAxis={false}
        showLegend={false}
      />
    </Card>
  );
}