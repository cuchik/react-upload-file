/* eslint-disable no-param-reassign */
import { ApiResponse } from 'model/api-response';
import HttpStatusCode from 'common/enum/http-status';

export class AxiosHelper {
  static statusValidator(statusCode) {
    return statusCode >= 200 && statusCode <= 503;
  }

  static requestInterceptor(config) {
    config.headers.Authorization = '';
    return config;
  }

  static responseInterceptor(response) {
    switch (response.status) {
      case HttpStatusCode.OK:
        return new ApiResponse(true, { data: response.data });
      case HttpStatusCode.CREATED:
        return new ApiResponse(true, { data: response.data });
      case HttpStatusCode.PATH_OK:
        return new ApiResponse(true, { data: response.data });
      default:
        return new ApiResponse(false, { error: response });
    }
  }

  static exceptionHandler(error) {
    return error;
  }
}
