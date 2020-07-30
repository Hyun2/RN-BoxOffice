import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default async (url) => {
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result);
    }

    const { data } = await axios.get(url);
    AsyncStorage.setItem(url, JSON.stringify(data));

    return data;
  } catch (e) {
    alert(e.message);
  }
}