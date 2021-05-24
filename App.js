import React, { useEffect } from 'react';
import './src/common/Config';
import './src/common/api/Api';
import './src/common/api/Interceptors';
import Router from './src/Router';
import AuthContextProvider from './src/authentication/store/AuthContext';

const App: () => Node = () => {

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
