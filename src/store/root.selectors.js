import get from 'lodash/get';

const selectData = (reducerKey, attrkey = '', defaultValue = []) => state => {
  const data =
    get(state, `${reducerKey}Reducer.${attrkey}.data`) || defaultValue;
  return data;
};
const selectLoading = (reducerKey, attrkey = '') => state => {
  return get(state, `${reducerKey}Reducer.${attrkey}.activityStatus`);
};

export { selectData, selectLoading };
