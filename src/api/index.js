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
export default api