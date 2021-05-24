import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import UseAuth from '../store/UseAuth';
import TextInputWithValidation from '../../common/components/TextInputWithValidation';
import FormWithValidation from '../../common/components/FormWithValidation';
import Button from '../../common/components/Button';
import { AuthContext } from '../store/AuthContext';
import { screens } from '../../Router';

const SignInScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const { onSignInFieldChange, onLoginPress, testa } = UseAuth();

  return (
    <View style={styles.container}>
      <FormWithValidation
        validFields={state.signInForm.validFields} style={styles.loginForm}
        renderSubmitTouchable={formIsValid => (
          <Button
            isDisabled={!formIsValid}
            onPress={onLoginPress}
          >
            <Text>Log in</Text>
          </Button>
        )}
      >
        <TextInputWithValidation
          style={styles.input}
          value={state.email}
          placeholder={'email'}
          onChangeText={(value, isValid) => onSignInFieldChange('email', value, isValid)}
          rules={['required', 'isEmail']}
          errorMessages={['Email cannot be empty', 'Please enter a valid email address']}
        />
        <TextInputWithValidation
          secureTextEntry
          style={styles.input}
          value={state.password}
          placeholder={'password'}
          onChangeText={(value, isValid) => onSignInFieldChange('password', value, isValid)}
          rules={['required']}
          externalError={state.signInForm.errors}
          errorMessages={['Password cannot be empty']}
        />

      </FormWithValidation>


        <Button
          onPress={testa}
        >
          <Text>test</Text>
        </Button>

        <Button
          onPress={() => navigation.navigate(screens.SIGN_UP_SCREEN)}
        >
          <Text>Sign up</Text>
        </Button>
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

});

export default SignInScreen;
