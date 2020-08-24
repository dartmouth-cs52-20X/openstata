const initialState = {
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return { authenticated: true };
    case 'DEAUTH_USER':
      return { authenticated: false };
    case 'AUTH_ERROR':
      return { authenticated: false };
    default:
      return state;
  }
};

export default AuthReducer;
