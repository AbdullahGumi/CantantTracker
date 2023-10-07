import {
  Platform,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useLayoutEffect, useState, useRef, useMemo, useCallback } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import CustomText from "../components/CustomText";
import { globalStyles } from "../styles";
import { RootStackScreenProps } from "../navigation/types";
import { AddIcon, CalendarIcon, ChartIcon } from "../../assets/svg";
import { hp } from "../util/LayoutUtil";

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<
    {
      name: string;
      amount: string;
      transactionType: string;
      icon: string;
      selectedDate: Date;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTransaction, setSelectedTransaction] = useState({});

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

  const transactionsTypes = [
    {
      name: "Custom",
      icon: "✍",
    },
    { name: "Income", icon: "💰", type: "income" },
    { name: "Transportation", icon: "🚙", type: "expense" },
    { name: "Food", icon: "🍝", type: "expense" },
    { name: "Healthcare", icon: "🏥", type: "expense" },
    { name: "Travel", icon: "✈", type: "expense" },
  ];
  const snapPoints = useMemo(() => ["90%", "100%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress1 = useCallback((index: number) => {
    transactionSheetRef.current?.snapToIndex(index);
  }, []);

  const handleSnapPress2 = useCallback((index: number) => {
    inputsSheetRef.current?.snapToIndex(index);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTransaction(item);
          handleSnapPress2(1);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          backgroundColor: "#d6d6d656",
          paddingVertical: hp(2.2),
          borderRadius: 8,
          margin: hp(1),
        }}
      >
        <View
          style={{
            borderRadius: 8,
            width: 45,
            height: 45,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#0D2A2C",
      },
      headerTitle: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("BalanceReport")}
          style={{}}
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
  }, []);

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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0D2A2C",
              height: hp(30),
              width: "100%",
              marginBottom: "auto",
            }}
          >
            <CustomText
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
              }}
            >
              This Month’s expenses
            </CustomText>
            <CustomText
              style={{
                color: "white",
                fontSize: hp(5),
                fontFamily: "Poppins-Bold",
              }}
            >
              ₦ 85,000
            </CustomText>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {transactions.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomText
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: "Poppins-SemiBold",
                    marginTop: 20,
                  }}
                >
                  No Transactions
                </CustomText>
                <CustomText
                  style={{
                    fontSize: hp(1.6),
                    fontFamily: "Poppins-SemiBold",
                    marginTop: 10,
                    marginBottom: 30,
                  }}
                >
                  Tap the button to add your transaction
                </CustomText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSnapPress1(0)}
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#0D2A2C",
                    padding: hp(2),
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <AddIcon color="white" />
                  </View>
                  <CustomText style={{ color: "white", fontSize: hp(1.8) }}>
                    Add Transaction
                  </CustomText>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  paddingHorizontal: 15,
                }}
              >
                <CustomText
                  style={{
                    paddingTop: hp(2.3),
                    fontSize: hp(1.8),
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  Transactions
                </CustomText>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 20 }}
                >
                  <View>
                    {transactions.map(
                      (
                        { amount, name, selectedDate, transactionType, icon },
                        i
                      ) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 15,
                            backgroundColor: "#d6d6d656",
                            paddingVertical: hp(2),
                            borderRadius: 8,
                            marginVertical: hp(0.7),
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
                            <CustomText>{icon}</CustomText>
                          </View>
                          <View style={{ marginRight: "auto", marginLeft: 15 }}>
                            <CustomText
                              style={{
                                fontSize: hp(1.6),
                                fontFamily: "Poppins-Bold",
                              }}
                            >
                              {name}
                            </CustomText>
                            <CustomText
                              style={{
                                fontSize: 12,
                                fontFamily: "Poppins-Bold",
                                opacity: 0.3,
                              }}
                            >
                              {transactionType}
                            </CustomText>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <CustomText
                              style={{
                                fontSize: 14,
                                fontFamily: "Poppins-SemiBold",
                                color:
                                  transactionType === "income"
                                    ? "#298200"
                                    : "#FF2121",
                              }}
                            >
                              {transactionType === "income" ? "+" : "-"}₦{" "}
                              {amount}
                            </CustomText>
                            <CustomText
                              style={{
                                fontSize: 10,
                                fontFamily: "Poppins-SemiBold",
                                opacity: 0.3,
                              }}
                            >
                              {selectedDate.toISOString().split("T")[0]}
                            </CustomText>
                          </View>
                        </View>
                      )
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        <BottomSheet
          ref={transactionSheetRef}
          snapPoints={snapPoints}
          index={-1}
          onChange={handleSheetChange}
          enablePanDownToClose
        >
          <BottomSheetFlatList
            data={transactionsTypes}
            keyExtractor={({ name }) => name}
            renderItem={renderItem}
          />
        </BottomSheet>
        <BottomSheet
          ref={inputsSheetRef}
          snapPoints={snapPoints}
          index={-1}
          onChange={handleSheetChange}
          enablePanDownToClose
        >
          <View
            style={{
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 8,
                width: hp(8),
                height: hp(8),
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.5,
                marginTop: hp(10),
              }}
            >
              <CustomText style={{ fontSize: 25 }}>
                {selectedTransaction.icon}
              </CustomText>
            </View>
            <View
              style={{
                width: "90%",
              }}
            >
              <CustomText
                style={{
                  fontSize: hp(1.6),
                  fontFamily: "Poppins-SemiBold",
                  marginBottom: 5,
                }}
              >
                Name
              </CustomText>
              <TextInput
                style={{
                  backgroundColor: "#d9d9d95f",
                  height: hp(8),
                  padding: hp(2),
                  borderRadius: 8,
                  fontSize: hp(1.8),
                  fontFamily: "Poppins-Bold",
                }}
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
            <View
              style={{
                width: "90%",
                marginTop: 10,
              }}
            >
              <CustomText
                style={{
                  fontSize: hp(1.6),
                  fontFamily: "Poppins-SemiBold",
                  marginBottom: 5,
                }}
              >
                Amount
              </CustomText>
              <TextInput
                style={{
                  backgroundColor: "#d9d9d95f",
                  height: hp(8),
                  padding: hp(2),
                  borderRadius: 8,
                  fontSize: hp(1.8),
                  fontFamily: "Poppins-Bold",
                }}
                placeholder="Enter amount"
                value={amount}
                keyboardType="number-pad"
                onChangeText={(e) => {
                  setAmount(e);
                }}
              />
            </View>
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
                  placeholderStyle={{
                    fontSize: hp(1.8),
                    fontFamily: "Poppins-Bold",
                    color: "#000000",
                    opacity: 0.4,
                  }}
                  items={[
                    { label: "Income", value: "income" },
                    { label: "Expense", value: "expense" },
                  ]}
                  setOpen={setOpen}
                  setValue={setTransactionType}
                  style={{
                    width: "100%",
                    height: hp(8),
                    backgroundColor: "#d9d9d95f",
                    padding: hp(2),
                    borderRadius: 8,
                    borderWidth: 0,
                  }}
                  dropDownContainerStyle={{
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  Platform.OS === "ios"
                    ? setCalendarOpen(true)
                    : showCalendarOnAndroid();
                }}
                style={{
                  backgroundColor: "#d9d9d95f",
                  height: hp(8),
                  padding: hp(2),
                  borderRadius: 8,
                  width: "45%",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: hp(1.8),
                      fontFamily: "Poppins-Bold",
                      opacity: 0.4,
                    }}
                  >
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
                setTransactions([
                  ...transactions,
                  {
                    name:
                      selectedTransaction.name !== "Custom"
                        ? selectedTransaction.name
                        : name,
                    amount,
                    transactionType,
                    selectedDate,
                    icon: selectedTransaction.icon,
                  },
                ]);
                setName("");
                setAmount("");
                setSelectedDate(new Date(""));
                setTransactionType("");
                inputsSheetRef.current.close();
                transactionSheetRef.current.close();
              }}
              style={{
                borderRadius: 8,
                backgroundColor: "#0D2A2C",
                padding: hp(2),
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                width: hp(22),
                marginTop: hp(5),
              }}
            >
              <CustomText style={{ color: "white", fontSize: hp(1.8) }}>
                Add
              </CustomText>
            </TouchableOpacity>
          </View>
        </BottomSheet>
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
