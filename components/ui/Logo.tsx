import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";

const LogoTitle = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.text}>{children}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
  text: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: colors.buttonColor,
  },
});

export default LogoTitle;
