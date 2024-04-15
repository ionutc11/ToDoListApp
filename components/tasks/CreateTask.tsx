import { Alert, StyleSheet, View } from "react-native";
import TaskCategory from "./TaskCategory";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import InputText from "../ui/InputText";
import { RootStackParamList, Task } from "../../interfaces/interfaces";
import Button from "../ui/Button";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DatePicker from "../ui/DatePicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNewTask, getTasks, updateTask } from "../../api/api";
import { AuthContext } from "../../context/auth-context";
import { TaskContext } from "../../context/task-context";

interface CreateTaskProps {
  isEdit?: boolean;
  taskId?: string;
}
const emptyTask = {
  title: "",
  completed: false,
  dueDate: new Date(),
  description: "",
  category: "",
  userUid: "",
};

const CreateTask = ({ isEdit, taskId }: CreateTaskProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [task, setTask] = useState<Task>(emptyTask);
  const [fieldsValid, setFieldsValid] = useState({
    title: true,
    dueDate: true,
    category: true,
  });
  const { token } = useContext(AuthContext);
  const { addTaskInStore, tasksInStore, updateTaskInStore } =
    useContext(TaskContext);

  const handleCategoryChange = (categType: string) =>
    handleTaskChange("category", categType);

  const handleTaskChange = (name: keyof Task, value: string | Date) => {
    setTask((prev) => ({ ...prev, [name]: value }));
    if (name !== "id") {
      setFieldsValid((prev) => ({ ...prev, [name]: true }));
    }
  };

  const onDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    handleTaskChange("dueDate", date || task.dueDate);
  };

  const validateFields = () => {
    let error = false;
    Object.keys(fieldsValid).forEach((key) => {
      if (!task[key as keyof Task]) {
        setFieldsValid((prev) => ({ ...prev, [key]: false }));
        error = true;
      }
    });

    return error;
  };

  const handleCreateTask = () => {
    const notValid = validateFields();

    if (notValid) {
      console.log("Task not valid!");
      return;
    }

    if (isEdit) {
      updateTask(task)
        .then((task) => {
          updateTaskInStore(task);
          navigation.navigate("HomeScreen");
        })
        .catch(() => {
          Alert.alert(
            "Eroare de actualizare",
            "Obiectivul nu a putut fi actualizat, va rugam reincercati!"
          );
        });
      return;
    }

    createNewTask(task, token)
      .then((task) => {
        addTaskInStore(task);
        navigation.navigate("HomeScreen");
      })
      .catch(() => {
        Alert.alert(
          "Eroare de inserare",
          "Obiectivul nu a putut fi adaugat, va rugam reincercati!"
        );
      });
  };

  useEffect(() => {
    if (!taskId) {
      setTask(emptyTask);
      return;
    }

    const task = tasksInStore.find((task) => task.id === taskId);

    if (task) {
      setTask(task);
    }
  }, [taskId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Actualizeaza obiectivul" : "Adauga un obiectiv",
    });
  }, [navigation, isEdit]);

  return (
    <View style={styles.root}>
      <TaskCategory
        handleChangeCategory={handleCategoryChange}
        selectedCategory={task.category}
        hasError={!fieldsValid.category}
      />
      <View style={styles.inputsContainer}>
        <InputText
          label="Titlu"
          onTextChange={(text) => handleTaskChange("title", text)}
          value={task.title}
          isValid={fieldsValid.title}
        />
        <InputText
          label="Descriere"
          onTextChange={(text) => handleTaskChange("description", text)}
          value={task.description || ""}
          multiline
        />
        <DatePicker
          value={task.dueDate}
          handleChange={onDateChange}
          openDatePicker={() => setShowDatePicker(true)}
          showDatePicker={showDatePicker}
          label="Data limita pentru obiectiv"
          isValid={fieldsValid.dueDate}
        />
        <View style={styles.btnContainer}>
          <Button
            onPress={handleCreateTask}
            backgroundColor={!isEdit ? "green" : ""}
          >
            {isEdit ? "Actualizeaza" : "Creeaza obiectiv"}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 12,
  },
  inputsContainer: {
    gap: 12,
  },
  btnContainer: {
    alignItems: "center",
  },
});

export default CreateTask;
