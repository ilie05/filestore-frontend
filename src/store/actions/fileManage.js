import * as actionTypes from "./actionTypes";

// const URL = 'http://127.0.0.1:8000/';
const URL = 'http://ec2-18-212-163-59.compute-1.amazonaws.com:8000/';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_FILE_START
  };
};

const loadFinish = () => {
  return {
    type: actionTypes.LOAD_FILE_FINISH
  };
};

const getFilesStart = () => {
  return {
    type: actionTypes.GET_FILE_START
  };
};

const getFilesFinish = files => {
  return {
    type: actionTypes.GET_FILE_FINISH,
    files: files
  };
};

export const cleanStore = () => {
  return {
    type: actionTypes.CLEAN_STORE
  }
}

export const loadFile = (fileContent, token) => dispatch => {
  dispatch(loadStart());
  let formData = new FormData();
  formData.append('file_content', fileContent);
  return fetch(URL + 'store/file', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Token ${token}`
    },
    body: formData,
  }).then(res => {
    dispatch(loadFinish());
    return res.json();
  })
    .catch(err => {
      dispatch(loadFinish());
    });
}

export const getFiles = token => dispatch => {
  dispatch(getFilesStart());
  fetch(URL + 'store/files', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Token ${token}`
    }
  }).then(res => {
    return res.json();
  })
    .then((data) => {
      dispatch(getFilesFinish(data))
    })
    .catch(err => console.log(err));
}

export const downloadFile = (filename, token) => dispatch => {
  fetch(`${URL}store/file?name=${filename}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`
    }
  }).then(res => {
    const contentDisposition = res.headers.get('content-disposition');
    const fileName = contentDisposition.split('; ')[1].split('=')[1];
    res.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    })
  })
    .catch(err => console.log(err));
}

export const deleteFile = (filename, token) => dispatch => {
  dispatch(getFilesStart());
  let formData = new FormData();
  formData.append('filename', filename);
  return fetch(URL + 'store/file', {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`
    },
    body: formData,
  })
    .catch(err => console.log(err));
}
