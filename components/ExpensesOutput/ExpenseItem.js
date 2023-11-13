import { Pressable, StyleSheet, View, Text } from 'react-native';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constant/style';

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();
  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={[styles.description, styles.textBase]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
