import React, { useEffect, useState, useLayoutEffect } from "react";

import CustomText from "../components/CustomText";
import { RootStackScreenProps } from "../navigation/types";
import { ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "../../assets/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles";
import { hp } from "../util/LayoutUtil";

const BalanceReportScreen = ({
  navigation,
}: RootStackScreenProps<"BalanceReport">) => {
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
            style={{ marginTop: hp(8) }}
          >
            <View
              style={{
                paddingHorizontal: hp(2),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  backgroundColor: "#d6d6d656",
                  paddingVertical: hp(2),
                  borderRadius: 8,
                  marginVertical: hp(0.7),
                  width: "100%",
                }}
              >
                <View
                  style={{
                    borderRadius: 8,
                    width: hp(5),
                    height: hp(5),
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomText>😀</CustomText>
                </View>
                <View style={{ marginRight: "auto", marginLeft: 15 }}>
                  <CustomText
                    style={{
                      fontSize: hp(1.6),
                      fontFamily: "Poppins-Bold",
                    }}
                  >
                    Food
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins-Bold",
                      opacity: 0.3,
                    }}
                  >
                    Income
                  </CustomText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <CustomText
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins-SemiBold",
                      color: "#298200",
                    }}
                  >
                    +₦3,500
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: 10,
                      fontFamily: "Poppins-SemiBold",
                      opacity: 0.3,
                    }}
                  >
                    2022/02/21
                  </CustomText>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BalanceReportScreen;
