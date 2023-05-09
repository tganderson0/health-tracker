import {
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
  Button,
  List,
  ListItem,
  Divider,
} from "@tremor/react";

const recentFoods = [
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
]

export default function CalorieCard() {
  return (
    <Card>
      <Flex alignItems="start">
        <div>
          <Text>Calories</Text>
          <Metric>1418 cal</Metric>
        </div>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">83.9%</Text>
        <Text>2050 cal</Text>
      </Flex>
      <ProgressBar percentageValue={83.9} className="mt-2" />
      <List className="mt-1">
        {recentFoods.map((item, index) => (
          <ListItem key={`${item.name}-${index}`}>
            <span> {item.name} </span>
            <span> {item.calories} cal</span>
          </ListItem>
        ))}
      </List>
      <Button className="mt-2" variant="secondary">Add Food</Button>
    </Card>
  )
}