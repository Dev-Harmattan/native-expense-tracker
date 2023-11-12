import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Expenses from './screens/Expenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpenses from './screens/ManageExpense';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <>
      <StatusBar style="light" />
      <Tab.Navigator>
        <Tab.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{ title: 'Recent Expenses' }}
        />
        <Tab.Screen
          name="AllExpenses"
          component={Expenses}
          options={{ title: 'Expenses' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          options={{ title: 'Manage Expenses' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
