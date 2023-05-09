import {
  Card,
  Flex,
  Metric,
  DonutChart,
  Text,
  Button,
} from "@tremor/react";

const generateBarData = (currentWaterMl, totalWaterMl) => [
  {
    name: 'current',
    value: currentWaterMl,
  },
  {
    name: 'remaining',
    value: Math.max(0, totalWaterMl - currentWaterMl),
  },
];

const data = generateBarData(1050, 3700);

const valueFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()} fl oz`;

export default function WaterCard() {
  return (
    <Card>
      <Flex alignItems="start">
        <div>
          <Text>Water</Text>
          <Metric>1050 fl oz</Metric>
        </div>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">Goal: 3700 fl oz</Text>
      </Flex>
      <DonutChart
        className="mt-6"
        data={data}
        category="value"
        index="name"
        colors={['cyan', 'slate']}
        valueFormatter={valueFormatter}
        label='1050 fl oz'
      />
      <Button className="mt-2" variant="secondary">Add Water</Button>
    </Card>
  )
}