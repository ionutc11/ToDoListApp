import { Task } from "../interfaces/interfaces";
import * as Notifications from "expo-notifications";

const useScheduleNotifications = () => {
  const scheduleNotificationForTask = (task: Task) => {};

  const scheduleNotificationHandler = ({ title, body, data }: {title: string, body: string, data: Object}) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data },
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  const fetchScheduledNotifications = async () => {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      return scheduledNotifications;
    } catch (error) {
      console.error("Error fetching scheduled notifications:", error);
      return [];
    }
  };

  return { scheduleNotificationForTask, scheduleNotificationHandler, fetchScheduledNotifications };
};

export default useScheduleNotifications;
