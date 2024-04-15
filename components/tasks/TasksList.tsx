import { FlatList, Image, StyleSheet, View } from "react-native";
import Title from "../ui/Title";
import { RootStackParamList, Task } from "../../interfaces/interfaces";
import TaskItem from "./TaskItem";
import TaskCategory from "./TaskCategory";
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setFilteredTasks(tasks);
  }, []);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCategoryChange = (newCategory: string) => {
    const newActualCategory = category === newCategory ? "" : newCategory;
    setCategory(newActualCategory);

    const newFilteredTasks = filterTasks(newActualCategory);
    setFilteredTasks(newFilteredTasks);
  };

  const filterTasks = (category: string) => {
    if (!category) {
      return tasks;
    }

    return tasks.filter((task) => task.category === category);
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {!tasks?.length ? (
          <View style={[styles.noTask, styles.center]}>
            <Image
              style={styles.image}
              source={require("../../assets/images/emptyList.gif")}
            />
            <View style={styles.center}>
              <Title>Nici un obiectiv activ!</Title>
              <Title>
                Apasati pe butonul + pentru a adauga un nou obiectiv!
              </Title>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.category}>
              <TaskCategory
                selectedCategory={category}
                handleChangeCategory={handleCategoryChange}
              />
            </View>
            <View style={{ padding: 4, marginBottom: 120 }}>
              <Title>Lista obiective</Title>
              <FlatList
                data={filteredTasks}
                centerContent={true}
                renderItem={({ item }) => (
                  <TaskItem
                    task={item}
                    handlePress={() =>
                      navigation.navigate("ViewTaskScreen", {
                        taskId: item.id!,
                        title: item.title,
                      })
                    }
                  />
                )}
                keyExtractor={(item) => item.id || item.title}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 12,
    marginBottom: 25,
    flex: 1,
  },
  content: {
    elevation: 5,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 210,
    opacity: 0.75,
  },
  category: {
    marginBottom: 6,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  noTask: {
    gap: 20,
  },
});

export default TasksList;
