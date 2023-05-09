import {
  Card,
  List,
  ListItem,
  Divider,
  Flex,
  Text,
  Metric,
} from "@tremor/react";

const foods = [
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
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
  {
    name: 'Snickers Ice Cream Bar',
    calories: 180,
  },
]

const MealCard = ({ meal }) => {

  return (
    <Card className="h-80 overflow-y-auto scrollbar-thumb-rounded-md scrollbar scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <Flex alignItems="start">
        <div>
          <Text>{meal}</Text>
          <Metric>{Math.round(Math.random() * 2000)} cal</Metric>
        </div>
      </Flex>
      <Divider />
      <List className="mt-1">
        {foods.map((item, index) => (
          <ListItem key={`${item.name}-${index}`}>
            <span> {item.name} </span>
            <span> {item.calories} cal</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default MealCard;