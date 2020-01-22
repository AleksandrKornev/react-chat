const initialState = {
  test_state: "test state text"
}

function test(state = initialState, action) {
  switch(action.type) {
    case "TEST": 
      console.log(action);
      return {
        message: initialState.test_state
      }
    default:
      return state
  }
}

export default test;