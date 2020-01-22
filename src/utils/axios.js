import * as $axios from 'axios';

export const axios = $axios.create({
  baseURL: 'http://localhost:3030',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export async function axiosToken(method, url, token, body) {
  url = url ? url : '';
  method = method ? method.toLowerCase() : 'GET';  

  let res = $axios.create({
    baseURL: 'http://localhost:3030',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : ''
    },
    timeout: 10000
  });

  return await res[method](url, body);
}