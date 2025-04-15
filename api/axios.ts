import axios from "axios";
import { Platform } from "react-native";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const baseUrls = {
  android: baseUrl,
  ios: baseUrl,
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export default axiosInstance;
