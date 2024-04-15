import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

const ScreenLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["white", "#caf2fa"]}
      style={styles.root}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default ScreenLayout;
