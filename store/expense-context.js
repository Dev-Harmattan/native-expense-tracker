import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    amount: 32.34,
    description: 'Groceries',
    date: new Date('2023-11-01'),
  },
  {
    id: 'e2',
    amount: 45.67,
    description: 'Dinner at a restaurant',
    date: new Date('2023-11-03'),
  },
  {
    id: 'e3',
    amount: 25.99,
    description: 'Gasoline for the car',
    date: new Date('2023-10-05'),
  },
  {
    id: 'e4',
    amount: 120.5,
    description: 'Online shopping',
    date: new Date('2023-11-07'),
  },
  {
    id: 'e5',
    amount: 15.75,
    description: 'Movie night',
    date: new Date('2023-11-09'),
  },
  {
    id: 'e6',
    amount: 60.0,
    description: 'Fitness class',
    date: new Date('2023-10-11'),
  },
  {
    id: 'e7',
    amount: 38.2,
    description: 'Coffee with friends',
    date: new Date('2023-10-13'),
  },
  {
    id: 'e8',
    amount: 75.45,
    description: 'Home decor',
    date: new Date('2023-10-15'),
  },
  {
    id: 'e9',
    amount: 22.5,
    description: 'Lunch with coworkers',
    date: new Date('2023-10-17'),
  },
  {
    id: 'e10',
    amount: 50.0,
    description: 'Books',
    date: new Date('2023-10-19'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'ADD':
      return [{ ...action.payload }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const values = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={values}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
