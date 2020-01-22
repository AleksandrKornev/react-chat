import { axios } from '../../utils/axios';
import to from 'await-to-js';
import jwtDecode from 'jwt-decode';

export async function authUser({ email, password }) {
  const url = '/authentication';
  const body = { 
    strategy: 'local', 
    email, 
    password 
  }

  const [err, res] = await to(axios.post(url, body));
  if (!!err) return { type: "ERR" };
  const data = res.data;
  if (res.status === 201) {
    const parseToken = jwtDecode(data.accessToken);
    editLocalStorage(data.accessToken);
    return {
      type: "AUTH_USER",
      data: {
        accessToken: data.accessToken,
        userID: parseToken.sub,
        email
      }
    }
  }
}

export function logout() {
  localStorage.removeItem('auth');
  return {
    type: 'LOGOUT'
  }
}

export async function loadFromLocalStorage() {
  const token = localStorage.getItem('auth');
  if (!token) return { type: 'err' };

  const [err, res] = await to(checkToken(token));
  if (err) return { type: 'err' };
  
  const user = res.data.user;

  return {
    type: 'LOAD_STORAGE',
    data: { 
      accessToken: token,
      userID: user.id,
      email: user.email
    }
  }
}

function editLocalStorage(token) {
  localStorage.setItem('auth', token);
}

async function checkToken(accessToken) {
  const body = { strategy: 'jwt', accessToken };
  const res = await axios.post("/authentication", body);

  return res; 
}
