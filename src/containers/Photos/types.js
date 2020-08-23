import { asyncActionType } from 'utils/methods';

export const PhotosTypes = {
  GET_PHOTOS: asyncActionType('GET_PHOTOS'),
  UPLOAD_PHOTOS: asyncActionType('UPLOAD_PHOTOS'),
  DELETE_PHOTOS: asyncActionType('DELETE_PHOTOS'),
};
