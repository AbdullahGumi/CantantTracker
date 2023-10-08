import React, { useState, useLayoutEffect } from "react";
import { ScrollView, TouchableOpacity, View, SafeAreaView } from "react-native";

import TransactionListItem from "../components/TransactionListItem";
import CustomText from "../components/CustomText";
import { RootStackScreenProps } from "../navigation/types";
import { ArrowLeftIcon } from "../../assets/svg";
import { globalStyles } from "../styles";
import { hp } from "../util/LayoutUtil";

const BalanceReportScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"BalanceReport">) => {
  const { transactions } = route.params;
  console.log(transactions);

  const filterOptions = [
    "Today",
    "Yesterday",
    "Last Week",
    "This Month",
    "All Time",
  ];
  const [selectedFilter, setSelectedFilter] = useState("Today");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Balance Report",
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#A6A6A6" />
        </TouchableOpacity>
      ),
    });
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
        <View style={{ width: "100%" }}>
          <CustomText
            style={{
              color: "black",
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              marginLeft: hp(2),
              marginBottom: hp(1.5),
            }}
          >
            Filter
          </CustomText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: hp(2) }}
          >
            {filterOptions.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.7}
                style={{
                  backgroundColor:
                    selectedFilter === filter ? "#0D2A2C" : "#00000010",
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(5),
                  paddingHorizontal: hp(1.5),
                  borderRadius: 8,
                  marginRight: hp(1.2),
                }}
              >
                <CustomText
                  style={{
                    color: selectedFilter === filter ? "#fff" : "#000",
                  }}
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
          <CustomText
            style={{
              color: "black",
              fontSize: hp(5),
              fontFamily: "Poppins-Bold",
            }}
          >
            ₦ 85,000
          </CustomText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: hp(8), width: "100%" }}
          >
            <View
              style={{
                paddingHorizontal: hp(2),
              }}
            >
              {transactions.map(
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
