import { Text as DefaultText } from "react-native";

export type TextProps = DefaultText["props"];

const CustomText = (props: TextProps) => {
  const { children } = props;
  return <DefaultText {...props}>{children}</DefaultText>;
};

export default CustomText;
