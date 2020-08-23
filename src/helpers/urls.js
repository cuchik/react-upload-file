import { compile } from 'path-to-regexp';
import isEmpty from 'lodash/isEmpty';

const processURL = (pathRegex, params) => {
  if (isEmpty(params)) {
    return pathRegex;
  }
  const toPath = compile(pathRegex);
  return toPath(params || {}, { encode: value => value });
};

const abstractURL = pathRegex => options => processURL(pathRegex, options);

const URL = {
  HOME: abstractURL('/'),

  // PHOTOS
  PHOTOS: abstractURL('/photos'),
};

export default URL;
