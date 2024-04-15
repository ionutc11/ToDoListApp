import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {}
  };
  const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const removeData = async (key: string) => {
    AsyncStorage.removeItem("key");
  };

  return { storeData, getData, removeData };
};

export default useLocalStorage;
