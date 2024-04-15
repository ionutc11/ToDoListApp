import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { getFormattedDate } from "../../helpers/date";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Button from "./Button";

interface DatePickerProps {
  showDatePicker: boolean;
  openDatePicker: () => void;
  value: Date;
  handleChange: (event: DateTimePickerEvent, date?: Date) => void;
  label: string;
  isValid?: boolean;
}

const DatePicker = ({
  showDatePicker,
  openDatePicker,
  value,
  handleChange,
  label,
  isValid,
}: DatePickerProps) => {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateView}>
        <View>
          <Text style={[styles.label, !isValid && styles.invalidLabel]}>
            {label}
          </Text>
          <Text style={styles.dateText}>{getFormattedDate(value)}</Text>
        </View>
        <View>
          <Button
            onPress={() => {
              openDatePicker();
            }}
          >
            Alege data
          </Button>
        </View>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          is24Hour={true}
          display="default"
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    padding: 12,
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  invalidLabel: { color: "red" },
});

export default DatePicker;
