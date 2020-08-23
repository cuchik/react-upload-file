import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';

import { selectData, selectLoading } from 'store/root.selectors';
import * as photosActions from './actions';
import PhotosComponent from './view';

const mapStateToProps = state => {
  return {
    photos: selectData('photos', 'photos')(state),
    photosLoading: selectLoading('photos', 'photos')(state),
    uploadPhotosLoading: selectLoading('photos', 'uploadPhotos')(state),
    deletePhotosLoading: selectLoading('photos', 'deletePhotos')(state),
    hasMore: get(state, 'photosReducer.photos.hasMore'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: bindActionCreators(photosActions.getPhotos, dispatch),
    uploadPhotos: bindActionCreators(photosActions.uploadPhotos, dispatch),
    deletePhotos: bindActionCreators(photosActions.deletePhotos, dispatch),
  };
};

const Photos = connect(mapStateToProps, mapDispatchToProps)(PhotosComponent);

export default Photos;
