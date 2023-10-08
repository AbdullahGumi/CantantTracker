import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";
import BalanceReportScreen from "../screens/BalanceReportScreen";
import HomeScreen from "../screens/home/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BalanceReport" component={BalanceReportScreen} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
