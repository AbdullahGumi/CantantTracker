import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as SQLite from "expo-sqlite";

import CustomText from "../../../components/CustomText";
import { CalendarIcon } from "../../../../assets/svg";
import { hp } from "../../../util/LayoutUtil";
import { ITransaction } from "../HomeScreen";

interface IProps {
  inputsSheetRef: React.RefObject<BottomSheetMethods>;
  transactionSheetRef: React.RefObject<BottomSheetMethods>;
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  showCalendarOnAndroid: () => void;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTransaction: ITransaction;
  selectedDate: Date;
  setSelectedDate: (value: React.SetStateAction<Date>) => void;
  transactions: ITransaction[];
  db: SQLite.SQLiteDatabase;
}

const AddTransactionSheet = ({
  transactions,
  selectedDate,
  inputsSheetRef,
  transactionSheetRef,
  selectedTransaction,
  showCalendarOnAndroid,
  setCalendarOpen,
  setTransactions,
  setSelectedDate,
  db,
}: IProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const snapPoints = useMemo(() => ["90%", "100%"], []);

  const addTransaction = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO transactions (name, amount, transactionType, selectedDate, icon) VALUES (?, ?, ?, ?, ?)",
        [
          selectedTransaction.name !== "Custom"
            ? selectedTransaction.name
            : name,
          amount,
          selectedTransaction.transactionType
            ? selectedTransaction.transactionType
            : transactionType,
          selectedDate.toISOString().split("T")[0],
          selectedTransaction.icon,
        ],
        (_, { insertId }) => {
          // Handle successful insertion if needed
        }
      );
    });
  };

  return (
    <BottomSheet
      ref={inputsSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <CustomText style={styles.iconText}>
            {selectedTransaction.icon}
          </CustomText>
        </View>
        <View style={styles.inputContainer}>
          <CustomText style={styles.label}>Name</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={
              selectedTransaction.name !== "Custom"
                ? selectedTransaction.name
                : name
            }
            onChangeText={(e) => {
              selectedTransaction.name === "Custom" && setName(e);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomText style={styles.label}>Amount</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            keyboardType="number-pad"
            onChangeText={(e) => {
              setAmount(e);
            }}
          />
        </View>
        <View style={styles.typeAndDateContainer}>
          <View style={{ width: "45%" }}>
            <DropDownPicker
              dropDownDirection="BOTTOM"
              open={open}
              value={
                selectedTransaction.name === "Income"
                  ? "income"
                  : selectedTransaction.name === "Custom"
                  ? transactionType
                  : "expense"
              }
              placeholder="Type"
              placeholderStyle={styles.dropdownPlaceholder}
              items={[
                { label: "Income", value: "income" },
                { label: "Expense", value: "expense" },
              ]}
              setOpen={setOpen}
              setValue={setTransactionType}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Platform.OS === "ios"
                ? setCalendarOpen(true)
                : showCalendarOnAndroid();
            }}
            style={styles.calendarButton}
          >
            <View style={styles.calendarButtonContent}>
              <CustomText style={styles.calendarButtonText}>
                {selectedDate
                  ? selectedDate.toISOString().split("T")[0]
                  : "Date"}
              </CustomText>
              <CalendarIcon color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (
              !(
                (name || selectedTransaction.name) &&
                (transactionType || selectedTransaction.transactionType)
              ) ||
              !amount
            ) {
              alert("Please fill in all required fields.");
              return;
            }
            setTransactions([
              ...transactions,
              {
                name:
                  selectedTransaction.name !== "Custom"
                    ? selectedTransaction.name
                    : name,
                amount,
                transactionType: selectedTransaction.transactionType
                  ? selectedTransaction.transactionType
                  : transactionType,
                selectedDate,
                icon: selectedTransaction.icon,
              },
            ]);
            addTransaction();
            setName("");
            setAmount("");
            setSelectedDate(new Date());
            setTransactionType("");
            inputsSheetRef.current?.close();
            transactionSheetRef.current?.close();
          }}
          style={styles.addButton}
        >
          <CustomText style={styles.addButtonText}>Add</CustomText>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddTransactionSheet;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 8,
    width: hp(8),
    height: hp(8),
    backgroundColor: "#d9d9d943",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
  },
  iconText: {
    fontSize: 25,
  },
  inputContainer: {
    width: "90%",
    marginTop: 10,
  },
  label: {
    fontSize: hp(1.6),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#d9d9d943",
    height: hp(8),
    padding: hp(2),
    borderRadius: 8,
    fontSize: hp(1.8),
    fontFamily: "Poppins-Bold",
    width: "100%",
  },
  typeAndDateContainer: {
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownPlaceholder: {
    fontSize: hp(1.8),
    fontFamily: "Poppins-Bold",
    color: "#000000",
    opacity: 0.4,
  },
  dropdownContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
  dropdown: {
    width: "100%",
    height: hp(8),
    backgroundColor: "#d9d9d943",
    padding: hp(2),
    borderRadius: 8,
    borderWidth: 0,
  },
  calendarButton: {
    backgroundColor: "#d9d9d943",
    height: hp(8),
    padding: hp(2),
    borderRadius: 8,
    width: "45%",
    justifyContent: "center",
  },
  calendarButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarButtonText: {
    fontSize: hp(1.8),
    fontFamily: "Poppins-Bold",
    opacity: 0.4,
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "#0D2A2C",
    padding: hp(2),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: hp(22),
    marginTop: "auto",
    marginBottom: "auto",
  },
  addButtonText: {
    color: "white",
    fontSize: hp(1.8),
  },
});
