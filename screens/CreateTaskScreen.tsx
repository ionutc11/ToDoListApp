import React from "react";
import ScreenLayout from "../layout/ScreenLayout";
import CreateTask from "../components/tasks/CreateTask";
import { ScreenProps } from "../interfaces/interfaces";
import { useFocusEffect } from "@react-navigation/native";

const CreateTaskScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
  const { taskId, isEdit } = route.params || {};

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        navigation.setParams({
          isEdit: false,
          taskId: "",
        });
      };
    }, [])
  );

  return (
    <ScreenLayout>
      <CreateTask isEdit={isEdit} taskId={taskId} />
    </ScreenLayout>
  );
};

export default CreateTaskScreen;
