import { FlatList, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderItem = ({ item }) => {
  return (
    <ExpenseItem
      description={item.description}
      amount={item.amount}
      date={item.date}
    />
  );
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
