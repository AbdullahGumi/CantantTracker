import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ITransaction } from "../screens/home/HomeScreen";

/* Common screens */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  BalanceReport: { transactions: ITransaction[] };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
