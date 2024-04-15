import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../helpers/date";
import Button from "../ui/Button";
import { Task } from "../../interfaces/interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../../context/task-context";
import { completeTask, reopenTask } from "../../api/api";

interface ViewTaskProps {
  id?: string;
}

const ViewTask = ({ id }: ViewTaskProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const { tasksInStore, completeTaskInStore, reopenTaskInStore } =
    useContext(TaskContext);
  const navigation = useNavigation();

  useEffect(() => {
    const task = tasksInStore.find((task) => task.id === id);
    if (task) {
      setTask(task);
    }
  }, []);

  if (!id || !task) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Obiectivul nu a putut fi gasit! Va rugam reincercati
        </Text>
        <Button onPress={() => navigation.goBack()}>Inapoi</Button>
      </SafeAreaView>
    );
  }

  const completeTaskHandler = () => {
    completeTask(task)
      .then(() => completeTaskInStore(task.id!))
      .catch(() => {
        Alert.alert(
          "Eroare",
          "Obiectivul nu a putut fi completat, va rugam reincercati!"
        );
      });
  };

  const reopenTaskHandler = () => {
    reopenTask(task)
      .then(() => reopenTaskInStore(task.id!))
      .catch(() => {
        Alert.alert(
          "Eroare",
          "Obiectivul nu a putut fi redeschis, va rugam reincercati!"
        );
      });
  };

  const renderButton = () => {
    return !task.completed ? (
      <Button onPress={completeTaskHandler} backgroundColor="green">
        Finalizeaza
      </Button>
    ) : (
      <Button onPress={reopenTaskHandler}>Redeschide obiectiv</Button>
    );
  };

  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={require("../../assets/images/task.png")}
      />
      <View style={styles.content}>
        {task.description && (
          <Text style={styles.text}>
            <Text style={styles.textBold}>Descriere:</Text> {task.description}
          </Text>
        )}
        <View>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Data limita:</Text>{" "}
            {getFormattedDate(task.dueDate)}
          </Text>
        </View>
        {renderButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 12,
  },
  content: {
    marginTop: 20,
    gap: 20,
  },
  image: {
    width: 250,
    height: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontWeight: "bold",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    gap: 15,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ViewTask;
