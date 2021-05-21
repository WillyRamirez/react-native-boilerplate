import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text } from 'react-native';
import UseAuth from '../store/UseAuth';
import { AuthContext } from '../store/AuthContext';
import { screens } from '../../Router';

const SignInScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const { onSignInFieldChange, onLoginPress, testa } = UseAuth();

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <TextInput
          style={styles.input}
          value={state.email}
          placeholder={'email'}
          onChangeText={value => onSignInFieldChange('email', value)}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          value={state.password}
          placeholder={'password'}
          onChangeText={value => onSignInFieldChange('password', value)}
        />
        <TouchableHighlight
          style={styles.loginButton}
          onPress={onLoginPress}
        >
          <Text>Log in</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={testa}
        >
          <Text>test</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => navigation.navigate(screens.SIGN_UP_SCREEN)}
        >
          <Text>Sign up</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginForm: {
    width: '100%',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000000',
    paddingHorizontal: 3,
    paddingVertical: 5,
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
