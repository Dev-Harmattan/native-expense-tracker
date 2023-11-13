import { FlatList, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderItem = ({ item }) => {
  return <ExpenseItem {...item} />;
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
