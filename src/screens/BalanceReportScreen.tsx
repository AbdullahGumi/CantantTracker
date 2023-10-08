import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, TouchableOpacity, View, SafeAreaView } from "react-native";
import { format, subDays, startOfWeek, startOfMonth } from "date-fns";

import { ITransaction } from "../screens/home/HomeScreen";
import TransactionListItem from "../components/TransactionListItem";
import CustomText from "../components/CustomText";
import { RootStackScreenProps } from "../navigation/types";
import { ArrowLeftIcon } from "../../assets/svg";
import { globalStyles } from "../styles";
import { hp } from "../util/LayoutUtil";
import { numberWithCommas } from "../util/StringUtil";
import { StyleSheet } from "react-native";

const BalanceReportScreen = ({
  navigation,
  route: {
    params: { transactions },
  },
}: RootStackScreenProps<"BalanceReport">) => {
  const filterOptions = [
    "Today",
    "Yesterday",
    "Last Week",
    "This Month",
    "All Time",
  ];

  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const calculateBalance = (transactions: ITransaction[]) => {
    const totalIncome = transactions.reduce((sum, transaction) => {
      if (transaction.transactionType === "income") {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);

    const totalExpenses = transactions.reduce((sum, transaction) => {
      if (transaction.transactionType === "expense") {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);

    return totalIncome - totalExpenses;
  };

  const filterTransactions = (filter: string) => {
    const currentDate = new Date();
    let filtered = transactions;

    switch (filter) {
      case "Today":
        filtered = transactions.filter(
          (transaction) =>
            format(new Date(transaction.selectedDate), "yyyy-MM-dd") ===
            format(currentDate, "yyyy-MM-dd")
        );
        break;
      case "Yesterday":
        const yesterday = subDays(currentDate, 1);
        filtered = transactions.filter(
          (transaction) =>
            format(new Date(transaction.selectedDate), "yyyy-MM-dd") ===
            format(yesterday, "yyyy-MM-dd")
        );
        break;
      case "Last Week":
        const lastWeek = startOfWeek(currentDate);
        filtered = transactions.filter(
          (transaction) =>
            new Date(transaction.selectedDate) >= lastWeek &&
            new Date(transaction.selectedDate) <= currentDate
        );
        break;
      case "This Month":
        const thisMonth = startOfMonth(currentDate);
        filtered = transactions.filter(
          (transaction) =>
            new Date(transaction.selectedDate) >= thisMonth &&
            new Date(transaction.selectedDate) <= currentDate
        );
        break;
      case "All Time":
        break;
      default:
    }

    setSelectedFilter(filter);
    setFilteredTransactions(filtered);
  };

  const balance = useMemo(
    () => calculateBalance(filteredTransactions),
    [filteredTransactions]
  );

  useEffect(() => {
    navigation.setOptions({
      title: "Balance Report",
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    filterTransactions(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    filterTransactions("Today");
  }, []);

  return (
    <SafeAreaView style={[globalStyles.SafeArea]}>
      <View
        style={[
          globalStyles.container,
          {
            paddingHorizontal: 0,
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={[styles.filterSection]}>
          <CustomText style={[styles.filterText]}>Filter</CustomText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.filterScrollView]}
          >
            {filterOptions.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => filterTransactions(filter)}
                activeOpacity={0.7}
                style={[
                  styles.filterButton,
                  selectedFilter === filter
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive,
                ]}
              >
                <CustomText
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter && { color: "#fff" },
                  ]}
                >
                  {filter}
                </CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            marginBottom: "auto",
            marginTop: hp(5),
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <CustomText style={[styles.balanceText]}>
            ₦ {numberWithCommas(balance.toFixed(2))}
          </CustomText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.transactionScrollView]}
          >
            <View style={[styles.transactionListContainer]}>
              {filteredTransactions.map(
                ({ amount, name, selectedDate, transactionType, icon }, i) => {
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
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BalanceReportScreen;

const styles = StyleSheet.create({
  filterSection: {
    width: "100%",
    marginTop: hp(3),
  },
  filterText: {
    color: "black",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginLeft: hp(2),
    marginBottom: hp(1.5),
  },
  filterScrollView: {
    flexDirection: "row",
    paddingLeft: hp(2),
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(5),
    paddingHorizontal: hp(1.5),
    borderRadius: 8,
    marginRight: hp(1.2),
  },
  filterButtonActive: {
    backgroundColor: "#0D2A2C",
  },
  filterButtonInactive: {
    backgroundColor: "#00000010",
  },
  filterButtonText: {
    color: "black",
  },
  balanceText: {
    color: "black",
    fontSize: hp(5),
    fontFamily: "Poppins-Bold",
  },
  transactionScrollView: {
    marginTop: hp(8),
    width: "100%",
  },
  transactionListContainer: {
    paddingHorizontal: hp(2),
  },
});
