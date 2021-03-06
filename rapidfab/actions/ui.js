import Constants from 'rapidfab/constants';

export function clearUIState(paths = []) {
  return {
    type: Constants.CLEAR_UI_STATE,
    paths,
  };
}

export function clearUIErrors() {
  return {
    type: Constants.CLEAR_UI_ERRORS,
  };
}
