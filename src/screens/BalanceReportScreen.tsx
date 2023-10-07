import React, { useEffect, useState, useLayoutEffect } from "react";

import CustomText from "../components/CustomText";
import { RootStackScreenProps } from "../navigation/types";
import { TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "../../assets/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles";
import { hp } from "../util/LayoutUtil";

const BalanceReportScreen = ({
  navigation,
}: RootStackScreenProps<"BalanceReport">) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Balance Report",
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 20 }}
        >
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
        <CustomText
          style={{
            color: "black",
            fontSize: hp(5),
            fontFamily: "Poppins-Bold",
          }}
        >
          ₦ 85,000
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default BalanceReportScreen;
