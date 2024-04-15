import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../theme/colors";

interface ButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  backgroundColor,
}) => {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          !!backgroundColor && { backgroundColor },
        ]}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  pressed: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: colors.buttonColor,
    borderRadius: 50,
    padding: 12,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default Button;
