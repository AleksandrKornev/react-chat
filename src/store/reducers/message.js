const initState = {
  messagesCurrentChat: [],
  chats: [],
  companion: {
    id: null,
    email: null
  }
}

function Message(state = initState, action) {
  switch(action.type) {
    case 'MESSAGE_SEND':
      return Object.assign({}, state, action.data);
    case 'MESSAGE_CHATS':
      return Object.assign({}, state, action.data);
    case 'MESSAGE_CHAT':
      return Object.assign({}, state, action.data);
    case 'CHAT_EXIT':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default Message;