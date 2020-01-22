const initState = {
  accessToken: null,
  userID: null,
  email: null
}

function Auth(state = initState, action) {
  switch(action.type) {
    case "AUTH_USER":
      return Object.assign({}, state, action.data);
    case "LOGOUT":
      return Object.assign({}, state, { accessToken: null });
    case "LOAD_STORAGE":
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

export default Auth;