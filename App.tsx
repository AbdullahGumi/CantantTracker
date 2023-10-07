import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./src/navigation/StackNavigator";
import useCachedResources from "./src/hooks/useCachedResources";

export default function App() {
  const { isLoadingComplete } = useCachedResources();
  if (isLoadingComplete) {
    return (
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StackNavigator />
            <StatusBar style="auto" />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}
