import firestore from "@react-native-firebase/firestore";
import { Task } from "../interfaces/interfaces";
import { fromFirestoreTimestampToDate } from "../helpers/date";

export const createNewTask = async (
  task: Task,
  token: string
): Promise<Task> => {
  try {
    const docRef = await firestore()
      .collection("task")
      .add({ ...task, userUid: token });

    return { ...task, userUid: token, id: docRef.id };
  } catch (error) {
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const docsRef = await firestore().collection("task").get();

    if (docsRef.empty) {
      return [];
    }

    const tasks: Task[] = docsRef.docs.map((doc) => {
      const docData = doc.data();
      return {
        ...docData,
        dueDate: fromFirestoreTimestampToDate(docData.dueDate),
        id: doc.id,
      } as Task;
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const completeTask = async (task: Task): Promise<Task> => {
  try {
    await firestore()
      .collection("task")
      .doc(task.id)
      .update({ completed: true });

    return { ...task, completed: true };
  } catch (error) {
    throw error;
  }
};

export const reopenTask = async (task: Task): Promise<Task> => {
  try {
    await firestore()
      .collection("task")
      .doc(task.id)
      .update({ completed: false });

    return { ...task, completed: false };
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    await firestore()
      .collection("task")
      .doc(task.id)
      .update({ ...task });

    return { ...task };
  } catch (error) {
    throw error;
  }
};

export const removeTask = async (taskId: string) => {
  try {
    await firestore().collection("task").doc(taskId).delete();
  } catch (error) {
    throw error;
  }
};
