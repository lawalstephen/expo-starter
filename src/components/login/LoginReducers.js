export const initialState = {
  loading: false,
  error: null,
  email:"",
  password:""

};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      if (action.data) {
        console.log("i go here to login", action.data)
        return {
          ...state,
          loading: false,
          error: null,
          isAuthenticated: true,
          token: action.data.token
        };
      }

      return state;
    }
    case "USER_LOGOUT": {
      console.log("i go here to logout")
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null
      };
    }
    case "USER_CHANGE_INPUT": {
      //console.log(action.data)
      if (action.data) {
        return {
          ...state,
          [action.data.name]: action.data.value
        };
      }

      return state;
    }
    default:
      return state;
  }
}
