import { all, fork } from 'redux-saga/effects';
import { watchPhotos } from 'containers/Photos/sagas';

export function* rootSaga() {
  yield all([fork(watchPhotos)]);
}
