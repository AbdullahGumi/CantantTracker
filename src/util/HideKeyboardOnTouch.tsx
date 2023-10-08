import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const HideKeyboardOnTouch = ({ children }: { children: React.ReactNode }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default HideKeyboardOnTouch;
