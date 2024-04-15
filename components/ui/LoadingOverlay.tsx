import { ActivityIndicator, StyleSheet, View } from "react-native";
import ScreenLayout from "../../layout/ScreenLayout";

const LoadingOverlay = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
});

export default LoadingOverlay;
