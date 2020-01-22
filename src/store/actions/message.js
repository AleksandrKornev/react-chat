import { axiosToken } from '../../utils/axios';
import to from 'await-to-js';

import store from '../index';

export async function send(text) {
  const url = '/messages';
  const method = 'POST';
  const { userID, accessToken } = store.getState().auth;
  const { id } = store.getState().message.companion;
  const body = {
    text,
    fromID: userID,
    toID: id
  }

  let [err, res] = await to(axiosToken(method, url, accessToken, body));
  if (!!err) return { type: 'ERR' };
  if (res) {}
  
  return {
    type: 'MESSAGE_SEND'
  }
}

export async function getAll() {
  const url = '/messages?chat=1';
  const method = 'GET';
  const token = store.getState().auth.accessToken;
  if(!token) return { type: 'ERR' };

  let [err, res] = await to(axiosToken(method, url, token));
  if (!!err) return { type: 'ERR' };

  const data = res.data.data;
  
  return {
    type: 'MESSAGE_CHATS',
    data: {
      chats: data
    }
  }
}

export async function getByChat(companionID) {
  const url = `/messages?$paginate=false&$limit=60&companionID=` + companionID ;
  const method = 'GET';
  const token = store.getState().auth.accessToken;
  if(!token) return { type: 'ERR' };
  
  let [err, res] = await to(axiosToken(method, url, token));
  if (!!err) return { type: 'ERR' };
  
  const data = res.data.data.reverse();
  const userID = store.getState().auth.userID;
  const companionEmail = data[0].companion;
  
  data.forEach(message => {
    // eslint-disable-next-line
    message.isOwnerUser = message.fromID == userID ? true : false;
  });
  
  return {
    type: 'MESSAGE_CHAT',
    data: {
      messagesCurrentChat: data,
      companion: {
        id: companionID,
        email: companionEmail
      }
    }
  }
}

export function exitFromChat() {
  return {
    type: 'CHAT_EXIT',
    data: {
      companion: {
        id: null,
        email: null
      }
    }
  }
} 
