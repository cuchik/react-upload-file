import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { PhotosService } from './services';
import * as memoActions from './actions';
import { PhotosTypes } from './types';

const service = new PhotosService();

export function* getPhotos(action) {
  try {
    yield put(memoActions.getPhotosLoading());
    const result = yield service.getPhotos(action.payload);
    yield put(memoActions.getPhotosSuccess(result, action.loadMore));
  } catch (ex) {
    yield put(memoActions.getPhotosError());
  }
}
export function* uploadPhotos(action) {
  try {
    yield put(memoActions.uploadPhotosLoading());
    const result = yield service.uploadPhotos(action.payload);
    yield put(memoActions.uploadPhotosSuccess(result));
    toast.success('Upload Photos Success');
    if (action.cb) action.cb();
  } catch (ex) {
    toast.error('Upload Photos Error');
    yield put(memoActions.uploadPhotosError());
  }
}
export function* deletePhotos(action) {
  try {
    yield put(memoActions.deletePhotosLoading());
    const result = yield service.deletePhotos(action.payload);
    if (result.message === 'OK') {
      yield put(memoActions.deletePhotosSuccess(action.payload));
      toast.success('Delete Photos Success');
      if (action.cb) action.cb();
    } else {
      toast.error('Delete Photos Error');
      yield put(memoActions.deletePhotosError());
    }
  } catch (ex) {
    toast.error('Delete Photos Error');
    yield put(memoActions.deletePhotosError());
  }
}
export function* watchPhotos() {
  yield takeLatest(PhotosTypes.GET_PHOTOS.ROOT, getPhotos);
  yield takeLatest(PhotosTypes.UPLOAD_PHOTOS.ROOT, uploadPhotos);
  yield takeLatest(PhotosTypes.DELETE_PHOTOS.ROOT, deletePhotos);
}
