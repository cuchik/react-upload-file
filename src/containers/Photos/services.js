import { BaseService } from 'services/base.service';
import { photosUrl } from 'common/urls/photos';

export class PhotosService extends BaseService {
  getPhotos(filters) {
    return super
      .post(`${photosUrl.list}`, filters)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  uploadPhotos(data) {
    return super
      .put(`${photosUrl.upload}`, data)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  deletePhotos(data) {
    return super
      .delete(`${photosUrl.upload}`, data)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
