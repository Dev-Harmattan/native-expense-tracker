import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect } from 'react';
import { ExpensesContext } from '../store/expense-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      const response = await fetchExpenses();
      expensesCtx.setExpenses(response);
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7daysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses Registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
