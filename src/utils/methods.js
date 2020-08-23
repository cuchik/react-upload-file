const asyncActionType = type => ({
  ROOT: `${type}`,
  LOADING: `${type}_LOADING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
  RESET: `${type}_RESET`,
});

export { asyncActionType };
