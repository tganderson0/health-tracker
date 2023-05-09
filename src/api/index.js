// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import axios from 'axios'

const methods = {
  get: 'get',
  post: 'post', 
  patch: 'patch',
  delete: 'delete'
}

const requestGenerator = (getBase) => (method, uri) => (data = {}, authorization = null) => {
  let requestPromise;
  switch (method) {
    case methods.get:
    case methods.post:
      requestPromise = axios[method](`${getBase()}/${uri}`, {...data}, {headers: {authorization}});
      break;
    case methods.delete:
      requestPromise = axios[method](`${getBase()}/${uri}`, {headers: {authorization}});
      break;
    default:
      requestPromise = axios[method](`${getBase()}/${uri}`)
      break;
  }
  return requestPromise
    .then(({data}) => data)
    .catch(e => e.response.data);
}

const getApiBase = () => 'url for api'
const r = requestGenerator(getApiBase);

const api = {
  // GET example
  // name: r('get', 'route')

  // POST example
  // name: r('post', 'route')

  // DELETE example
  // name: r('delete', 'route')
}


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9z1KiaNJcxDMNqKPytaEyJyz007BPhUw",
  authDomain: "health-tracker-c2db1.firebaseapp.com",
  projectId: "health-tracker-c2db1",
  storageBucket: "health-tracker-c2db1.appspot.com",
  messagingSenderId: "530232649065",
  appId: "1:530232649065:web:b4a2d56f2dfd3b52a6c9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default api