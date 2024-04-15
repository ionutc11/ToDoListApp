import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface TitleProps {
  children: ReactNode;
  color?: string;
}

const Title: React.FC<TitleProps> = ({ children, color }) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.title, !!color && { color }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { marginBottom: 5 },
  title: { fontSize: 16, fontWeight: "bold" },
});

export default Title;
