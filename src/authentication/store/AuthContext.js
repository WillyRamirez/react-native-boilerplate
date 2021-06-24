import React, { useReducer } from 'react';
import update from 'immutability-helper';
import { getValidFields } from '../../common/Util';

export const AuthContext = React.createContext(null);

export const types = {
  SIGN_IN_USER: 'sign_in_user',
  SIGN_IN_USER_SUCCESS: 'sign_in_user_success',
  SIGN_IN_USER_FAIL: 'sign_in_user_fail',
  SIGN_UP_USER: 'sign_up_user',
  SIGN_UP_USER_SUCCESS: 'sign_up_user_success',
  SIGN_UP_USER_FAIL: 'sign_up_user_fail',
  SET_SIGNED_IN: 'set_signed_in',
  LOG_OUT: 'log_out',
  ON_SIGN_IN_FIELD_CHANGE: 'on_sign_in_field_change',
  ON_SIGN_UP_FIELD_CHANGE: 'on_sign_up_field_change',
  ON_FORGOT_PASSWORD_FIELD_CHANGE: 'on_forgot_password_field_change',
  FORGOT_PASSWORD: 'forgot_password',
  FORGOT_PASSWORD_SUCCESS: 'forgot_password_success',
  FORGOT_PASSWORD_FAIL: 'forgot_password_fail',
};

const initialState = {
  signInForm: {
    errors: {},
    validFields: [],
    email: '',
    password: '',
  },
  forgotPasswordForm: {
    email: '',
    validFields: [],
    success: false,
  },
  user: {},
  signUpForm: {
    errors: {},
    validFields: [],
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  isLoading: false,
  isSignedIn: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case types.SET_SIGNED_IN:
      return update(state, { isSignedIn: { $set: action.payload.isSignedIn } });
    case types.FORGOT_PASSWORD:
    case types.SIGN_IN_USER:
    case types.SIGN_UP_USER:
      return update(state, { isLoading: { $set: true } });
    case types.SIGN_IN_USER_SUCCESS:
    case types.SIGN_UP_USER_SUCCESS:
      return update(state, {
        isLoading: { $set: false },
        isSignedIn: { $set: true },
        user: { $set: action.payload.user },
      });
    case types.SIGN_IN_USER_FAIL:
      return update(state, {
        isLoading: { $set: false },
        isSignedIn: { $set: false },
        signInForm: { errors: { $set: action.payload.errors } },
      });
    case types.SIGN_UP_USER_FAIL: {
      let errorObj;
      action.payload.errors.forEach(error => {
        errorObj = {
          ...errorObj,
          [error.param]: { ...error },
        };
      });
      return update(state, { signUpForm: { errors: { $set: errorObj } } });
    }
    case types.ON_SIGN_IN_FIELD_CHANGE:
      const validFields = getValidFields(state.signInForm.validFields, action.payload.key, action.payload.isValid)
      return update(state, {
        signInForm: {
          [action.payload.key]: { $set: action.payload.value },
          validFields: { $set: validFields },
        },
      });
    case types.ON_SIGN_UP_FIELD_CHANGE: {
      const validFields = getValidFields(state.signUpForm.validFields, action.payload.key, action.payload.isValid)
      return update(state, {
        signUpForm: {
          [action.payload.key]: { $set: action.payload.value },
          validFields: { $set: validFields },
        },
      });
    }
    case types.ON_FORGOT_PASSWORD_FIELD_CHANGE: {
      const validFields = getValidFields(state.forgotPasswordForm.validFields, action.payload.key, action.payload.isValid)
      return update(state, {
        forgotPasswordForm: {
          [action.payload.key]: { $set: action.payload.value },
          validFields: { $set: validFields },
        },
      });
    }
    case types.FORGOT_PASSWORD_SUCCESS:
      return update(state, {
        isLoading: { $set: false },
        forgotPasswordForm: { success: { $set: true } },
      });
    case types.FORGOT_PASSWORD_FAIL:
      return update(state, {
        isLoading: { $set: false },
        forgotPasswordForm: { success: { $set: false } },
      });
    default:
      return state;
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
