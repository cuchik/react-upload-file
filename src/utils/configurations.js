import Axios from 'axios';
import { AppConfig } from 'common/urls';
import { AxiosHelper } from './axios-helper';

Axios.defaults.baseURL = AppConfig.BaseURL;

Axios.interceptors.request.use(
  config => AxiosHelper.requestInterceptor(config),
  error => AxiosHelper.exceptionHandler(error),
);
Axios.defaults.validateStatus = statusNumber =>
  AxiosHelper.statusValidator(statusNumber);
Axios.interceptors.response.use(
  response => AxiosHelper.responseInterceptor(response),
  error => AxiosHelper.exceptionHandler(error),
);
