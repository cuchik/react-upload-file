import axios from 'axios';

export class BaseService {
  /**
   *
   */
  _path;

  constructor(path = '') {
    this._path = path;
  }

  select(path, params) {
    return axios
      .get(this.getPath(path), { params })
      .then(response => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  post(path, data, headers) {
    return axios
      .post(this.getPath(path), data, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      })
      .then(response => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  patch(path, data) {
    return axios
      .patch(this.getPath(path), data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  put(path, data) {
    return axios
      .put(this.getPath(path), data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  delete(path, data) {
    return axios
      .delete(this.getPath(path), {
        headers: {},
        data,
      })
      .then(response => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  getPath(path) {
    return path ? `${this._path}/${path}` : this._path;
  }
}
