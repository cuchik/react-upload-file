import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import pReducer from './root.reducers';
import { rootSaga } from './root.sagas';

const initStore = () => {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    pReducer,
    compose(
      applyMiddleware(logger, sagaMiddleware),
    ),
  )
  sagaMiddleware.run(rootSaga)
  return store
}


const store = initStore();
export default store;