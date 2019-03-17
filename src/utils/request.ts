import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 5000,
});

// Request interceptors
httpClient.interceptors.request.use(
  (config) => {
    // Add X-Token header to every request,
    // you can add other custom headers here
    //   config.headers['X-Token'] = <TOKEN_VALUE>;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
httpClient.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 20000) {
      // Something wrong

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // Should do LogOut
        location.reload();
      }
      return Promise.reject(response.data);
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return Promise.reject({
        code: error.response.status,
        message: error.response.data,
        data: error,
      });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject({
        code: 444,
        message: 'The request was made but no response was received',
        data: error,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        code: 417,
        message: 'Something happened in setting up the request that triggered an Error',
        data: error,
      });
    }
    // return Promise.reject(error);
  },
);

export default httpClient;
