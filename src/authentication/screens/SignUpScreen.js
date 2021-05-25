import React, { useContext } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { TextInputWithValidation, FormWithValidation, Button } from '../../common/components/';
import { AuthContext } from '../store/AuthContext';
import UseAuth from '../store/UseAuth';

const SignUpScreen = () => {
  const { state } = useContext(AuthContext);
  const { onSignUpFieldChange, onSignUpFormSubmit } = UseAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormWithValidation
        style={styles.signUpForm}
        validFields={state.signUpForm.validFields}
        renderSubmitTouchable={formIsValid => (
          <Button
            isDisabled={!formIsValid}
            onPress={onSignUpFormSubmit}
          >
            <Text>Sign up</Text>
          </Button>
        )}
      >
        <TextInputWithValidation
          style={styles.input}
          value={state.signUpForm.first_name}
          label={'First name'}
          onChangeText={(value, isValid) => onSignUpFieldChange('first_name', value, isValid)}
          rules={['required', 'minStringLength:2', 'maxStringLength:30']}
          externalError={state.signUpForm.errors.first_name}
          errorMessages={['First name cannot be empty', 'Must be between 2 and 30 characters', 'Must be between 2 and 30 characters']}
        />
        <TextInputWithValidation
          style={styles.input}
          value={state.signUpForm.last_name}
          label={'Last name'}
          onChangeText={(value, isValid) => onSignUpFieldChange('last_name', value, isValid)}
          rules={['required', 'minStringLength:2', 'maxStringLength:30']}
          externalError={state.signUpForm.errors.last_name}
          errorMessages={['Last name cannot be empty', 'Must be between 2 and 30 characters', 'Must be between 2 and 30 characters']}
        />
        <TextInputWithValidation
          style={styles.input}
          value={state.signUpForm.username}
          label={'Username'}
          onChangeText={(value, isValid) => onSignUpFieldChange('username', value, isValid)}
          rules={['required', 'minStringLength:2', 'maxStringLength:20']}
          externalError={state.signUpForm.errors.username}
          errorMessages={['Username cannot be empty', 'Must be between 2 and 30 characters', 'Must be between 2 and 30 characters']}
        />
        <TextInputWithValidation
          style={styles.input}
          value={state.signUpForm.email}
          label={'Email'}
          onChangeText={(value, isValid) => onSignUpFieldChange('email', value, isValid)}
          rules={['required', 'isEmail']}
          externalError={state.signUpForm.errors.email}
          errorMessages={['Email cannot be empty', 'Please enter a valid email address']}
        />
        <TextInputWithValidation
          secureTextEntry
          style={styles.input}
          value={state.signUpForm.password}
          label={'Password'}
          onChangeText={(value, isValid) => onSignUpFieldChange('password', value, isValid)}
          rules={['required', 'matchRegexp:^(?=[a-zA-Z\\d_:?.+\\-=!#@$%^&*()]{6,50}$)(?=.*[A-Z].*$)(?=.*[a-z].*$)(?=.*[\\d].*$).*$']}
          externalError={state.signUpForm.errors.password}
          errorMessages={['Password cannot be empty', 'Must be between 6 and 50 characters and contain at least one upper case latter and at least one number']}
        />
        <TextInputWithValidation
          secureTextEntry
          style={styles.input}
          value={state.signUpForm.confirm_password}
          label={'Confirm password'}
          onChangeText={(value, isValid) => onSignUpFieldChange('confirm_password', value, isValid)}
          rules={['required', 'match']}
          matchValue={state.signUpForm.password}
          errorMessages={['Password cannot be empty', 'Must match your password']}
        />
      </FormWithValidation>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
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
