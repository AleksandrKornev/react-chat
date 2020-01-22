import axios from 'axios';

const serverUrl = 'http://localhost:3030';

export function test(arg1) {
  console.log('arg', arg1);
  return {
    type: "TEST",
    payload: "tst"
  }
}

export async function getUser() {
  const url = serverUrl + '/user';
  const res = await axios.get(url);
}