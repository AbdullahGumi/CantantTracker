import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import CustomText from "./CustomText";

import { numberWithCommas } from "../util/StringUtil";
import { hp } from "../util/LayoutUtil";
import { ITransaction } from "../screens/home/HomeScreen";

const TransactionListItem = ({
  icon,
  name,
  transactionType,
  amount,
  selectedDate,
}: ITransaction) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <CustomText style={styles.transactionIconText}>{icon}</CustomText>
      </View>
      <View style={styles.transactionDetailsContainer}>
        <CustomText style={styles.transactionNameText}>{name}</CustomText>
        <CustomText style={styles.transactionTypeText}>
          {transactionType}
        </CustomText>
      </View>
      <View style={styles.transactionAmountContainer}>
        <CustomText
          style={[
            styles.transactionAmountText,
            transactionType === "income"
              ? styles.transactionAmountIncome
              : styles.transactionAmountExpense,
          ]}
        >
          {transactionType === "income" ? "+" : "-"}₦ {numberWithCommas(amount)}
        </CustomText>
        <CustomText style={styles.transactionDateText}>
          {format(new Date(selectedDate), "MM/dd/yyyy")}
        </CustomText>
      </View>
    </View>
  );
};
export default TransactionListItem;

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
