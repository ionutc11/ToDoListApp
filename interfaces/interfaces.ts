import { NavigationProp, RouteProp } from "@react-navigation/native";

export interface Task {
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  category: string;
  userUid?: string;
  id?: string;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  CreateTaskScreen: { isEdit: boolean, taskId: string } | undefined;
  ViewTaskScreen: { taskId: string; title: string };
  AuthScreen: undefined
};

export type ScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList>;
};
