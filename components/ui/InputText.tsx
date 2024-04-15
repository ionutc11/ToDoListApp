import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../theme/colors";

interface InputTextProps {
  onTextChange: (text: string) => void;
  value: string;
  label?: string;
  multiline?: boolean;
  isValid?: boolean;
}

const InputText = ({
  onTextChange,
  label,
  multiline,
  value,
  isValid = true,
}: InputTextProps) => {
  return (
    <View style={styles.root}>
      {label && (
        <Text style={[styles.label, !isValid && styles.invalidLabel]}>
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={onTextChange}
        style={[
          styles.input,
          multiline && styles.multi,
          !isValid && styles.invalidInput,
        ]}
        multiline={!!multiline}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { padding: 6, gap: 5 },
  label: { fontSize: 14, fontWeight: "600" },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    height: 35,
    paddingLeft: 20,
  },
  multi: {
    height: 60,
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: colors.invalidBackground,
  },
});

export default InputText;
