import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ScreenLayout from "../layout/ScreenLayout";
import TasksList from "../components/tasks/TasksList";
import IconButton from "../components/ui/IconButton";
import { ScreenProps } from "../interfaces/interfaces";
import { getTasks } from "../api/api";
import { TaskContext } from "../context/task-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { tasksInStore, setTasksInStore } = useContext(TaskContext);
  const [fetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getTasks()
      .then((tasksList) => {
        setTasksInStore(tasksList);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  }, []);

  if (fetching) {
    return <LoadingOverlay />;
  }

  return (
    <ScreenLayout>
      <TasksList tasks={tasksInStore} />
      <View style={styles.floatingButton}>
        <IconButton
          size={40}
          name="add"
          color="white"
          onPress={() => navigation.navigate("CreateTaskScreen")}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: "10%",
    right: 32,
  },
});

export default HomeScreen;
