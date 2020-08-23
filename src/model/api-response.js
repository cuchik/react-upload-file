export class ApiResponse {
  /**
   *
   */
  data;

  error;

  isSuccess;

  constructor(success, opt = {}) {
    this.isSuccess = success;
    this.data = opt.data;
    this.error = opt.error;
  }
}
