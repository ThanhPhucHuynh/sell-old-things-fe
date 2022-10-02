import { AxiosRequestConfig } from 'axios';

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default axiosRequestConfiguration;
