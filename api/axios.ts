import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://10.40.200.134:8080",
  ios: "http://10.40.200.134:8080",
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === "ios" ? baseUrls.ios : baseUrls.android,
});

export default axiosInstance;
