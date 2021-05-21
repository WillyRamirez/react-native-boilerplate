import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { screens } from '../../Router';
import { AuthContext } from '../store/AuthContext';
import UseAuth from '../store/UseAuth';

const SignUpScreen = () => {
  const { state } = useContext(AuthContext);
  const { onSignUpFieldChange, onSignUpFormSubmit } = UseAuth();

  return (
    <View style={styles.container}>
      <View style={styles.signUpForm}>
        <TextInput
          style={styles.input}
          value={state.signUpForm.first_name}
          placeholder={'First name'}
          onChangeText={value => onSignUpFieldChange('first_name', value)}
        />
        <TextInput
          style={styles.input}
          value={state.signUpForm.last_name}
          placeholder={'Last name'}
          onChangeText={value => onSignUpFieldChange('last_name', value)}
        />
        <TextInput
          style={styles.input}
          value={state.signUpForm.username}
          placeholder={'Username'}
          onChangeText={value => onSignUpFieldChange('username', value)}
        />
        <TextInput
          style={styles.input}
          value={state.signUpForm.email}
          placeholder={'Email'}
          onChangeText={value => onSignUpFieldChange('email', value)}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          value={state.signUpForm.password}
          placeholder={'Password'}
          onChangeText={value => onSignUpFieldChange('password', value)}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          value={state.signUpForm.confirm_password}
          placeholder={'Confirm password'}
          onChangeText={value => onSignUpFieldChange('confirm_password', value)}
        />
        <TouchableHighlight
          style={styles.loginButton}
          onPress={onSignUpFormSubmit}
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
  signUpForm: {
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
export default SignUpScreen;
