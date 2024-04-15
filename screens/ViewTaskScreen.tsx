import React, { useLayoutEffect, useState } from "react";
import ScreenLayout from "../layout/ScreenLayout";
import { ScreenProps } from "../interfaces/interfaces";
import ViewTask from "../components/tasks/ViewTask";
import IconButton from "../components/ui/IconButton";

const ViewTaskScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
  const taskId = route.params?.taskId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          name="create-outline"
          size={24}
          color={tintColor}
          onPress={() => {
            // @ts-ignore
            navigation.navigate("CreateTaskScreen", {
              isEdit: true,
              taskId: taskId,
            });
          }}
          buttonBackgroundColor="white"
        />
      ),
    });
  }, [navigation]);

  return (
    <ScreenLayout>
      <ViewTask id={taskId} />
    </ScreenLayout>
  );
};

export default ViewTaskScreen;
