import {isEmpty} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageItem = async (key: string) => {
  try {
    if (isEmpty(key)) return '';
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data as string);
  } catch (e: any) {
    return '';
  }
};

export const storeAsyncStorageItem = async (key: string, data: any) => {
  if (isEmpty(key)) return '';
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e: any) {
    return false;
  }
};

export const removeAsyncStorageItem = async (key: string) => {
  try {
    if (isEmpty(key)) return '';
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e: any) {
    return e;
  }
};

export const clearAsyncStorageItem = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e: any) {
    return e;
  }
};

export enum ASYNC_STORAGE_KEYS {
  'users' = 'users',
  'userDetails' = 'userDetails',
  'sessionTime' = 'sessionTime',
}
