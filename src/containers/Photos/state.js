import ActivityStatus from 'common/enum/activity';

export class PhotosState {
  photos;

  uploadPhotos;

  deletePhotos;

  constructor() {
    this.photos = {
      activityStatus: ActivityStatus.NoActivity,
      data: [],
      hasMore: true,
      error: null,
    };
    this.uploadPhotos = {
      activityStatus: ActivityStatus.NoActivity,
      data: {},
      error: null,
    };
    this.deletePhotos = {
      activityStatus: ActivityStatus.NoActivity,
      data: {},
      error: null,
    };
  }
}
