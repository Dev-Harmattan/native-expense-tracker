import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constant/style';
import { ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpensesContext);

  const currentExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    setIsSubmitting(true);
    try {
      expenseCtx.deleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Oops! Couldn't delete expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmHandler = async (expense) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expense);
        updateExpense(editedExpenseId, expense);
      } else {
        const id = await storeExpense(expense);
        expenseCtx.addExpense({ ...expense, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Oops! Couldn't Update or delete the expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) return <ErrorOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Create'}
        defaultValues={currentExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={34}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
  deleteContainer: {
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
