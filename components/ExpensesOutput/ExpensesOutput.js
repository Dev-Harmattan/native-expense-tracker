import { StyleSheet, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constant/style';

const EXPENSES = [
  {
    id: 'e1',
    amount: 32.34,
    description: 'Groceries',
    date: new Date('2023-07-01'),
  },
  {
    id: 'e2',
    amount: 45.67,
    description: 'Dinner at a restaurant',
    date: new Date('2023-07-03'),
  },
  {
    id: 'e3',
    amount: 25.99,
    description: 'Gasoline for the car',
    date: new Date('2023-07-05'),
  },
  {
    id: 'e4',
    amount: 120.5,
    description: 'Online shopping',
    date: new Date('2023-07-07'),
  },
  {
    id: 'e5',
    amount: 15.75,
    description: 'Movie night',
    date: new Date('2023-07-09'),
  },
  {
    id: 'e6',
    amount: 60.0,
    description: 'Fitness class',
    date: new Date('2023-07-11'),
  },
  {
    id: 'e7',
    amount: 38.2,
    description: 'Coffee with friends',
    date: new Date('2023-07-13'),
  },
  {
    id: 'e8',
    amount: 75.45,
    description: 'Home decor',
    date: new Date('2023-07-15'),
  },
  {
    id: 'e9',
    amount: 22.5,
    description: 'Lunch with coworkers',
    date: new Date('2023-07-17'),
  },
  {
    id: 'e10',
    amount: 50.0,
    description: 'Books',
    date: new Date('2023-07-19'),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
