import { StatusBar } from "expo-status-bar";
import Layout from "./layout/Layout";
import AuthContextProvider from "./context/auth-context";
import NotificationsManager from "./components/notifications/Notifications";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        {/* <Layout /> */}
        <NotificationsManager />
      </AuthContextProvider>
    </>
  );
}
