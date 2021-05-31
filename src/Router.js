import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './authentication/screens/SignInScreen';
import SignUpScreen from './authentication/screens/SignUpScreen';
import HomeScreen from './home/screens/HomeScreen';
import UseAuth from './authentication/store/UseAuth';
import { AuthContext } from './authentication/store/AuthContext';

const Stack = createStackNavigator();

export const screens = {
  SIGN_UP_SCREEN: 'Sign up',
  SIGN_IN_SCREEN: 'Sign in',
  HOME_SCREEN: 'Home',
};

const Router = () => {
  const { state } = useContext(AuthContext);
  const { onAppInit } = UseAuth();

  useEffect(() => {
    onAppInit();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonOptions}>
        {state.isSignedIn ? (
          <>
            <Stack.Screen name={screens.HOME_SCREEN} component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={screens.SIGN_IN_SCREEN} component={SignInScreen} options={hideTitle} />
            <Stack.Screen name={screens.SIGN_UP_SCREEN} component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const hideTitle = {
  title: '',
};
const commonOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
};

export default Router;
