import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import useScheduleNotifications from "../../hooks/useScheduleNotifications";
import Button from "../ui/Button";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const { scheduleNotificationHandler } = useScheduleNotifications();

const NotificationsManager = () => {
  useEffect(() => {
    const subcscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received");
        console.log(notification);
      }
    );
    const subResponse = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification response received");
        console.log(response.notification.request.content.data);
      }
    );

    return () => {
      subcscription.remove();
      subResponse.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          //   scheduleNotificationHandler({ body: JSON.stringify({ test: "ok" }), data:  });
        }}
      >
        Baga
      </Button>
    </SafeAreaView>
  );
};

export default NotificationsManager;
