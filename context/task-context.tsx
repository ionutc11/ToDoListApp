import { ReactNode, createContext, useState } from "react";
import { Task } from "../interfaces/interfaces";

type TaskContextType = {
  tasksInStore: Task[];
  setTasksInStore: (tasks: Task[]) => void;
  removeTaskInStore: (taskId: string) => void;
  addTaskInStore: (task: Task) => void;
  completeTaskInStore: (taskId: string) => void;
  reopenTaskInStore: (taskId: string) => void;
  updateTaskInStore: (task: Task) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasksInStore: [],
  setTasksInStore: () => [],
  removeTaskInStore: () => false,
  addTaskInStore: () => false,
  completeTaskInStore: () => false,
  reopenTaskInStore: () => false,
  updateTaskInStore: () => false,
});

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const setTasksInStore = (tasks: Task[]) => setTasks(tasks);

  const addTaskInStore = (task: Task) => setTasks((prev) => [task, ...prev]);

  const removeTaskInStore = (taskId: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  const updateTaskInStore = (taskToUpdate: Task) => {
    const foundTaskId = tasks.findIndex((task) => task.id === taskToUpdate.id);
    const localTasks = tasks;
    localTasks[foundTaskId] = taskToUpdate;
    setTasks([...localTasks]);
  };

  const toggleTaskCompleted = (taskId: string) => {
    const foundTaskId = tasks.findIndex((task) => task.id === taskId);
    const localTasks = tasks;
    localTasks[foundTaskId].completed = !localTasks[foundTaskId].completed;
    setTasks([...localTasks]);
  };

  const value = {
    tasksInStore: tasks,
    setTasksInStore,
    addTaskInStore,
    removeTaskInStore,
    completeTaskInStore: toggleTaskCompleted,
    reopenTaskInStore: toggleTaskCompleted,
    updateTaskInStore,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
