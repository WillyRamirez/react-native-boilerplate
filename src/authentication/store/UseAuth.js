import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { api, initApi,  } from '../../common/api/Api';
import secureStore from '../../common/SecureStorageService';
import { AuthContext, types } from './AuthContext';

const UseAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const onAppInit = async () => {
    const accessToken = await secureStore.get({ service: 'accessToken' });
    const refreshToken = await secureStore.get({ service: 'refreshToken' });

    if (accessToken && refreshToken) {
      initApi(accessToken);
      dispatch({ type: types.SET_SIGNED_IN, payload: { isSignedIn: true } });
    }
  };

  const onSignInFieldChange = (key, value, isValid) => {
    dispatch({ type: types.ON_SIGN_IN_FIELD_CHANGE, payload: { key, value, isValid } });
  };

  const onSignUpFieldChange = (key, value, isValid) => {
    dispatch({ type: types.ON_SIGN_UP_FIELD_CHANGE, payload: { key, value, isValid } });
  };

  const onLoginPress = async () => {
    dispatch({ type: types.SIGN_IN_USER });

    const response = await api.signIn(state.signInForm.email.toLowerCase(), state.signInForm.password);
    console.log('response: ', response);

    if (response.ok) {
      dispatch({ type: types.SIGN_IN_USER_SUCCESS, payload: { user: response.data.user } });

      secureStore.set('refreshToken', response.data.refreshToken);
      secureStore.set('accessToken', response.data.accessToken);
    } else {
      dispatch({ type: types.SIGN_IN_USER_FAIL, payload: { errors: response.data.errors } });
    }
  };

  const onSignUpFormSubmit = async () => {
    dispatch({ type: types.SIGN_UP_USER });
    const { first_name, last_name, username, email, password, confirm_password } = state.signUpForm;
    const data = { first_name, last_name, username, email, password };

    const response = await api.signUp(data);

    if (response.ok) {
      secureStore.set('refreshToken', response.data.refreshToken);
      secureStore.set('accessToken', response.data.accessToken);
      dispatch({ type: types.SIGN_UP_USER_SUCCESS, payload: { user: response.data.user } });
    } else {
      dispatch({ type: types.SIGN_UP_USER_FAIL, payload: { errors: response.data.errors } });
    }
  };

  const onLogoutPress = async () => {
    const refreshToken = await secureStore.get({ service: 'refreshToken' });
    const response = await api.logout(refreshToken);

    await secureStore.delete('refreshToken');
    await secureStore.delete('accessToken');
    dispatch({ type: types.SET_SIGNED_IN, payload: { isSignedIn: false } });
  };

  const testa = async () => {
    const response = await api.getUsers();
    console.log('response: ', response);
  };

  return {
    onLoginPress,
    onLogoutPress,
    onSignInFieldChange,
    onSignUpFieldChange,
    onSignUpFormSubmit,
    testa,
    onAppInit,
  };
};

export default UseAuth;
