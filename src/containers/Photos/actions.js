import { PhotosTypes } from './types';

// GET
export const getPhotos = (filter, loadMore) => {
  return { type: PhotosTypes.GET_PHOTOS.ROOT, payload: filter, loadMore };
};
export const getPhotosLoading = () => {
  return { type: PhotosTypes.GET_PHOTOS.LOADING };
};
export const getPhotosSuccess = (payload, loadMore) => {
  return { type: PhotosTypes.GET_PHOTOS.SUCCESS, payload, loadMore };
};
export const getPhotosError = payload => {
  return { type: PhotosTypes.GET_PHOTOS.ERROR, payload };
};

// UPLOAD
export const uploadPhotos = (data, cb) => {
  return { type: PhotosTypes.UPLOAD_PHOTOS.ROOT, payload: data, cb };
};
export const uploadPhotosLoading = () => {
  return { type: PhotosTypes.UPLOAD_PHOTOS.LOADING };
};
export const uploadPhotosSuccess = payload => {
  return { type: PhotosTypes.UPLOAD_PHOTOS.SUCCESS, payload };
};
export const uploadPhotosError = payload => {
  return { type: PhotosTypes.UPLOAD_PHOTOS.ERROR, payload };
};
// DELETE
export const deletePhotos = (data, cb) => {
  return { type: PhotosTypes.DELETE_PHOTOS.ROOT, payload: data, cb };
};
export const deletePhotosLoading = () => {
  return { type: PhotosTypes.DELETE_PHOTOS.LOADING };
};
export const deletePhotosSuccess = payload => {
  return { type: PhotosTypes.DELETE_PHOTOS.SUCCESS, payload };
};
export const deletePhotosError = payload => {
  return { type: PhotosTypes.DELETE_PHOTOS.ERROR, payload };
};
