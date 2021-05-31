import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import './src/common/Config';
import './src/common/api/Api';
import './src/common/api/Interceptors';
import { IS_IOS} from './src/common/Constants';
import Router from './src/Router';
import AuthContextProvider from './src/authentication/store/AuthContext';
import { colors } from './src/common/Colors';

const App: () => Node = () => {

  return (
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
