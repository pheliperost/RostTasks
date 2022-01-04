import { Platform } from 'react-native';

const url = Platform.OS === 'ios' ? process.env.REACT_APP_IOS_URL : process.env.REACT_APP_ANDROID_URL;

const instance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {}
  });

  export const get = async (endpoint) => {
    return await instance.get(endpoint);
  };

  export const post = async (endpoint, params) => {
    return await instance.post(endpoint, params);
  };