import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Title from "../ui/Title";
import categories from "../../constants/categories";
import colors from "../../theme/colors";

interface TaskCategoryProps {
  selectedCategory: string;
  handleChangeCategory: (categoryType: string) => void;
  hasError?: boolean;
}

const TaskCategory = ({
  handleChangeCategory,
  selectedCategory,
  hasError = false,
}: TaskCategoryProps) => {
  return (
    <View style={styles.root}>
      <Title color={hasError ? "red" : ""}>Categorie</Title>
      <View style={styles.itemsContainer}>
        {categories.map(({ color, icon, name, type }, index) => (
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() => handleChangeCategory(type)}
            key={`${index}_${type}`}
          >
            <View
              style={[
                styles.itemContainer,
                type === selectedCategory && styles.selectedItem,
              ]}
            >
              {/* @ts-ignore */}
              <Ionicons size={24} name={icon} color={color} />
              <Text style={styles.itemText}>{name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 5,
  },
  itemContainer: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderColor: colors.menuFocused,
    borderRadius: 30,
    alignContent: "center",
    alignItems: "center",
    borderWidth: 2,
    flexDirection: "column",
    flexWrap: "wrap",
    minWidth: 80,
  },
  selectedItem: {
    borderColor: colors.buttonColor,
  },
  itemText: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});

export default TaskCategory;
