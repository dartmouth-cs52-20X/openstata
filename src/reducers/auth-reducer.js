const initialState = {
  authenticated: false,
  username: '',
  email: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        authenticated: true,
        username: (action.payload && action.payload.username) ?? state.username,
        email: (action.payload && action.payload.email) ?? state.email,
      };
    case 'DEAUTH_USER':
      return {
        authenticated: false,
        username: '',
        email: '',
      };
    case 'AUTH_ERROR':
      return {
        authenticated: false,
        username: '',
        email: '',
      };
    default:
      return state;
  }
};

export default AuthReducer;
