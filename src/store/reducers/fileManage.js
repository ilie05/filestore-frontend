import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
  files: [],
  loadingUpload: false,
  loadingDownload: false,
  loadingDelete: false,
  loadingGetFiles: false,
};

const loadStart = (state, action) => {
  return updateObject(state, {
    loadingUpload: true
  });
};
const loadFinish = (state, action) => {
  return updateObject(state, {
    loadingUpload: false
  });
};

const getFilesStart = (state, action) => {
  return updateObject(state, {
    loadingGetFiles: true
  });
};
const getFilesFinish = (state, action) => {
  return updateObject(state, {
    loadingGetFiles: false,
    files: action.files
  });
};

const cleanStore = (state, action) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FILE_START:
      return loadStart(state, action);
    case actionTypes.LOAD_FILE_FINISH:
      return loadFinish(state, action)
    case actionTypes.GET_FILE_START:
      return getFilesStart(state, action);
    case actionTypes.GET_FILE_FINISH:
      return getFilesFinish(state, action);
    case actionTypes.CLEAN_STORE:
      return cleanStore(state, action);
    default:
      return state;
  }
};

export default reducer;
