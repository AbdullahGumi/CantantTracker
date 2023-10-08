import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { hp } from "../../../util/LayoutUtil";
import CustomText from "../../../components/CustomText";
import { AddIcon } from "../../../../assets/svg";

const transactionsTypes = [
  {
    name: "Custom",
    icon: "✍",
  },
  { name: "Income", icon: "💰", transactionType: "income" },
  { name: "Transportation", icon: "🚙", transactionType: "expense" },
  { name: "Food", icon: "🍝", transactionType: "expense" },
  { name: "Healthcare", icon: "🏥", transactionType: "expense" },
  { name: "Travel", icon: "✈", transactionType: "expense" },
];

interface IProps {
  transactionSheetRef: React.RefObject<BottomSheetMethods>;
  setSelectedTransaction: (value: any) => void;
  handleSnapPress2: (value: any) => void;
}

const SelectTransactionSheet = ({
  transactionSheetRef,
  handleSnapPress2,
  setSelectedTransaction,
}: IProps) => {
  const snapPoints = useMemo(() => ["90%", "100%"], []);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTransaction(item);
          handleSnapPress2(1);
        }}
        style={styles.itemContainer}
      >
        <View style={styles.iconContainer}>
          <CustomText style={{ fontSize: hp(2.5) }}>{item.icon}</CustomText>
        </View>
        <View style={{ marginRight: "auto", marginLeft: 15 }}>
          <CustomText style={{ fontSize: hp(1.6), fontFamily: "Poppins-Bold" }}>
            {item.name}
          </CustomText>
        </View>
        <AddIcon color="black" />
      </TouchableOpacity>
    );
  }, []);

  return (
    <BottomSheet
      ref={transactionSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetFlatList
        data={transactionsTypes}
        keyExtractor={({ name }) => name}
        renderItem={renderItem}
      />
    </BottomSheet>
  );
};

export default SelectTransactionSheet;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#d9d9d943",
    paddingVertical: hp(2.2),
    borderRadius: 8,
    margin: hp(1),
  },
  iconContainer: {
    borderRadius: 8,
    width: hp(5.5),
    height: hp(5.5),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
