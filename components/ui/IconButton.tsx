import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import colors from "../../theme/colors";

interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  size: number;
  color?: string;
  noButtonPadding?: boolean;
  buttonBackgroundColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  name,
  color,
  size,
  noButtonPadding,
  buttonBackgroundColor,
}) => {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          noButtonPadding && { padding: 0 },
          !!buttonBackgroundColor && { backgroundColor: buttonBackgroundColor },
        ]}
      >
        {/* @ts-ignore */}
        <Ionicons name={name} color={color} size={size} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  pressed: {
    opacity: 0.5,
    padding: 11,
  },
  button: {
    backgroundColor: colors.buttonColor,
    borderRadius: 50,
    padding: 12,
  },
});

export default IconButton;
