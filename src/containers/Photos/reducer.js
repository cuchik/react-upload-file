/* eslint-disable no-case-declarations */
import get from 'lodash/get';
import ActivityStatus from 'common/enum/activity';

import { findIndex } from 'lodash';
import { PhotosState } from './state';
import { PhotosTypes } from './types';

const initialPhotosState = new PhotosState();

export const photosReducer = (state = initialPhotosState, action) => {
  switch (action.type) {
    // GET
    case PhotosTypes.GET_PHOTOS.LOADING:
      return {
        ...state,
        photos: {
          ...state.photos,
          activityStatus: ActivityStatus.Loading,
          error: null,
        },
      };
    case PhotosTypes.GET_PHOTOS.SUCCESS:
      const photos = get(action.payload, 'documents') || [];
      const limit = get(action.payload, 'limit');
      const count = get(action.payload, 'count');
      return {
        ...state,
        photos: {
          data: action.loadMore ? [...state.photos.data, ...photos] : photos,
          activityStatus: ActivityStatus.Success,
          error: null,
          hasMore: count >= limit,
        },
      };
    case PhotosTypes.GET_PHOTOS.ERROR:
      return {
        ...state,
        photos: {
          data: [],
          activityStatus: ActivityStatus.Error,
          error: null,
        },
      };
    // UPLOAD
    case PhotosTypes.UPLOAD_PHOTOS.LOADING:
      return {
        ...state,
        uploadPhotos: {
          data: {},
          activityStatus: ActivityStatus.Loading,
          error: null,
        },
      };
    case PhotosTypes.UPLOAD_PHOTOS.SUCCESS:
      return {
        ...state,
        uploadPhotos: {
          data: action.payload,
          activityStatus: ActivityStatus.Success,
          error: null,
        },
      };
    case PhotosTypes.UPLOAD_PHOTOS.ERROR:
      return {
        ...state,
        uploadPhotos: {
          data: {},
          activityStatus: ActivityStatus.Error,
          error: null,
        },
      };
    // DELETE
    case PhotosTypes.DELETE_PHOTOS.LOADING:
      return {
        ...state,
        deletePhotos: {
          data: {},
          activityStatus: ActivityStatus.Loading,
          error: null,
        },
      };
    case PhotosTypes.DELETE_PHOTOS.SUCCESS:
      const deletePhotos = action.payload;
      const newPhotos = [...state.photos.data];
      return {
        ...state,
        deletePhotos: {
          data: action.payload,
          activityStatus: ActivityStatus.Success,
          error: null,
        },
        photos: {
          ...state.photos,
          data: newPhotos.filter(
            p =>
              findIndex(deletePhotos, { documents: p.name, album: p.album }) <
              0,
          ),
        },
      };
    case PhotosTypes.DELETE_PHOTOS.ERROR:
      return {
        ...state,
        deletePhotos: {
          data: {},
          activityStatus: ActivityStatus.Error,
          error: null,
        },
      };

    default:
      return state;
  }
};
