import { AxiosRequestConfig } from "axios";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: "https://secure.topoftherocknyc.com/TopoftheRockWebAPI/API/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};
