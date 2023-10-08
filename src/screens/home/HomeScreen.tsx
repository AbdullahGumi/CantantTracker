import {
  Platform,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";

import CustomText from "../../components/CustomText";
import TransactionListItem from "../../components/TransactionListItem";
import { globalStyles } from "../../styles";
import { RootStackScreenProps } from "../../navigation/types";
import { AddIcon, ChartIcon } from "../../../assets/svg";

import { hp } from "../../util/LayoutUtil";
import { numberWithCommas } from "../../util/StringUtil";
import HideKeyboardOnTouch from "../../util/HideKeyboardOnTouch";
import SelectTransactionSheet from "./components/SelectTransactionSheet";
import AddTransactionSheet from "./components/AddTransactionSheet";

export interface ITransaction {
  name: string;
  amount: number;
  transactionType: string;
  icon: string;
  selectedDate: Date;
}

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const db = SQLite.openDatabase("database11101.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount REAL, transactionType TEXT, selectedDate TEXT, icon TEXT)"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM transactions",
        undefined,
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setTransactions(resultSet.rows._array);
        }
      );
    });
  }, []);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction>({
    amount: 0,
    icon: "",
    transactionType: "",
    selectedDate: new Date(),
    name: "",
  });

  const onChange = (event: DateTimePickerEvent, selected: any) => {
    const currentDate = selected;
    setSelectedDate(currentDate);
    setCalendarOpen(false);
  };

  const showCalendarOnAndroid = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const transactionSheetRef = useRef<BottomSheet>(null);
  const inputsSheetRef = useRef<BottomSheet>(null);

  const handleSnapPress1 = useCallback((index: number) => {
    transactionSheetRef.current?.snapToIndex(index);
  }, []);

  const handleSnapPress2 = useCallback((index: number) => {
    inputsSheetRef.current?.snapToIndex(index);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#0D2A2C",
      },
      headerTitle: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BalanceReport", {
              transactions,
            });
          }}
        >
          <ChartIcon color={"white"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleSnapPress1(0)}
          style={{
            marginLeft: 20,
          }}
        >
          <AddIcon color={"white"} />
        </TouchableOpacity>
      ),
    });
  }, [transactions]);

  const calculateExpenses = () => {
    const currentDate = selectedDate;
    const currentMonth = currentDate.getMonth();
    const totalExpenses = transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.selectedDate);
      if (
        transactionDate.getMonth() === currentMonth &&
        transaction.transactionType === "expense"
      ) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
    return totalExpenses;
  };

  return (
    <>
      <SafeAreaView
        style={[
          globalStyles.SafeArea,
          {
            backgroundColor: Platform.OS === "android" ? "#0D2A2C" : "white",
          },
        ]}
      >
        <View
          style={[
            globalStyles.container,
            {
              paddingHorizontal: 0,
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={styles.container}>
            <CustomText style={styles.headerText}>
              This Month’s expenses
            </CustomText>
            <CustomText style={styles.amountText}>
              ₦ {numberWithCommas(calculateExpenses().toFixed(2))}
            </CustomText>
          </View>
          <View style={styles.contentContainer}>
            {transactions.length === 0 ? (
              <View style={styles.noTransactionsContainer}>
                <CustomText style={styles.noTransactionsText1}>
                  No Transactions
                </CustomText>
                <CustomText style={styles.noTransactionsText2}>
                  Tap the button to add your transaction
                </CustomText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSnapPress1(0)}
                  style={styles.addButton}
                >
                  <View style={styles.addIcon}>
                    <AddIcon color="white" />
                  </View>
                  <CustomText style={styles.addButtonText}>
                    Add Transaction
                  </CustomText>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.transactionsContainer}>
                <CustomText style={styles.transactionsHeaderText}>
                  Transactions
                </CustomText>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 20 }}
                >
                  {transactions.map(
                    (
                      { amount, name, selectedDate, transactionType, icon },
                      i
                    ) => {
                      return (
                        <TransactionListItem
                          key={i}
                          amount={amount}
                          name={name}
                          selectedDate={selectedDate}
                          transactionType={transactionType}
                          icon={icon}
                        />
                      );
                    }
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        <SelectTransactionSheet
          handleSnapPress2={handleSnapPress2}
          setSelectedTransaction={setSelectedTransaction}
          transactionSheetRef={transactionSheetRef}
        />
        <AddTransactionSheet
          db={db}
          selectedDate={selectedDate}
          selectedTransaction={selectedTransaction}
          setCalendarOpen={setCalendarOpen}
          setSelectedDate={setSelectedDate}
          setTransactions={setTransactions}
          showCalendarOnAndroid={showCalendarOnAndroid}
          transactionSheetRef={transactionSheetRef}
          transactions={transactions}
          inputsSheetRef={inputsSheetRef}
        />
      </SafeAreaView>
      {calendarOpen && Platform.OS === "ios" && (
        <DateTimePicker
          value={selectedDate}
          mode={"date"}
          onChange={onChange}
          display="spinner"
        />
      )}
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D2A2C",
    height: hp(30),
    width: "100%",
    marginBottom: "auto",
  },
  headerText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  amountText: {
    color: "white",
    fontSize: hp(5),
    fontFamily: "Poppins-Bold",
  },
  contentContainer: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  noTransactionsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noTransactionsText1: {
    fontSize: hp(1.8),
    fontFamily: "Poppins-SemiBold",
    marginTop: 20,
  },
  noTransactionsText2: {
    fontSize: hp(1.6),
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
    marginBottom: 30,
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "#0D2A2C",
    padding: hp(2),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addIcon: {
    marginRight: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: hp(1.8),
  },
  transactionsContainer: {
    height: "100%",
    paddingHorizontal: 15,
  },
  transactionsHeaderText: {
    paddingTop: hp(2.3),
    fontSize: hp(1.8),
    fontFamily: "Poppins-SemiBold",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#d9d9d943",
    paddingVertical: hp(2),
    borderRadius: 8,
    marginVertical: hp(0.7),
  },
  transactionIconContainer: {
    borderRadius: 8,
    width: hp(5),
    height: hp(5),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionIconText: {},
  transactionDetailsContainer: {
    marginRight: "auto",
    marginLeft: 15,
  },
  transactionNameText: {
    fontSize: hp(1.6),
    fontFamily: "Poppins-Bold",
  },
  transactionTypeText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    opacity: 0.3,
  },
  transactionAmountContainer: {
    alignItems: "flex-end",
  },
  transactionAmountText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  transactionAmountIncome: {
    color: "#298200",
  },
  transactionAmountExpense: {
    color: "#FF2121",
  },
  transactionDateText: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    opacity: 0.3,
  },
});
