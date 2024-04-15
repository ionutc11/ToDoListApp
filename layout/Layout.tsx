import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ViewTaskScreen from "../screens/ViewTaskScreen";
import AuthScreen from "../screens/AuthScreen";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import TaskContextProvider from "../context/task-context";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={() => ({
      drawerActiveBackgroundColor: colors.menuFocused,
    })}
  >
    <Drawer.Screen
      name="HomeScreen"
      options={{
        drawerLabel: "Acasa",
        title: "Bine ai venit!",
        drawerIcon: ({ color, focused, size }) => (
          <Ionicons color={color} size={size} name="home" />
        ),
      }}
      component={HomeScreen}
    />
    <Drawer.Screen
      name="CreateTaskScreen"
      options={{
        drawerLabel: "Adauga obiectiv",
        title: "Adauga un obiectiv",
        drawerIcon: ({ color, focused, size }) => (
          <Ionicons color={color} size={size} name="add" />
        ),
      }}
      component={CreateTaskScreen}
    />
  </Drawer.Navigator>
);

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
          title: "Authentication",
        }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <TaskContextProvider>
      <Stack.Navigator
        screenOptions={({}) => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen
          name="ViewTaskScreen"
          component={ViewTaskScreen}
          options={({ route }) => ({
            // @ts-ignore
            title: route.params?.title,
            headerShown: true,
          })}
          initialParams={{ isEdit: false, taskId: undefined }}
        />
      </Stack.Navigator>
    </TaskContextProvider>
  );
};

const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default Layout;
