import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../../interfaces/interfaces";
import colors from "../../theme/colors";
import { getFormattedDate } from "../../helpers/date";
import IconButton from "../ui/IconButton";
import { removeTask } from "../../api/api";
import { useContext } from "react";
import { TaskContext } from "../../context/task-context";

interface TaskItemProps {
  task: Task;
  handlePress: () => void;
}

const TaskItem = ({ task, handlePress }: TaskItemProps) => {
  const { removeTaskInStore } = useContext(TaskContext);

  const handleDeleteTask = () => {
    removeTask(task.id!)
      .then(() => {
        removeTaskInStore(task.id!);
      })
      .catch();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <View style={styles.content}>
        <IconButton
          name={task.completed ? "checkmark-circle-outline" : "ellipse-outline"}
          onPress={() => {}}
          size={24}
          color={colors.buttonColor}
          noButtonPadding
          buttonBackgroundColor="white"
        />
        <Text style={[styles.title, task.completed && styles.strike]}>
          {task.title}
        </Text>
        <View style={styles.rightSide}>
          <Text style={styles.date}>{getFormattedDate(task.dueDate)}</Text>
          <IconButton
            name={"trash"}
            onPress={() => {
              Alert.alert("Stergere", "Doriti sa stergeti acest obiectiv?", [
                {
                  text: "Da",
                  onPress: handleDeleteTask,
                },
                {
                  text: "Nu",
                },
              ]);
            }}
            size={24}
            color={"red"}
            noButtonPadding
            buttonBackgroundColor="white"
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  strike: {
    textDecorationLine: "line-through",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  root: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 30,
    padding: 8,
    marginVertical: 8,
    backgroundColor: "white",
  },
  date: {
    color: colors.buttonColor,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  rightSide: {
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  pressed: {
    opacity: 0.6,
  },
});

export default TaskItem;
