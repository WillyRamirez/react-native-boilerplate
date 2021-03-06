import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UseAuth from '../store/UseAuth';
import { TextInputWithValidation, FormWithValidation, Button, Link, Title } from '../../common/components/';
import { colors } from '../../common/Colors';
import { AuthContext } from '../store/AuthContext';
import { screens } from '../../Router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faShieldAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IS_IOS } from '../../common/Constants';

const SignInScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const { onSignInFieldChange, onLoginPress } = UseAuth();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollview}
      enableOnAndroid
    >
      <View style={styles.titleContainer}>
        <Title>Sign in</Title>
        <Text style={styles.subTitle}>Please sign in to continue</Text>
      </View>
      <FormWithValidation
        validFields={state.signInForm.validFields} style={styles.loginForm}
        renderSubmitTouchable={formIsValid => (
          <Button
            rightIcon={faArrowRight}
            isDisabled={!formIsValid}
            onPress={onLoginPress}
          >
            <Text>LOG IN</Text>
          </Button>
        )}
      >
        <TextInputWithValidation
          style={styles.input}
          value={state.signInForm.email}
          label="Email"
          leftIcon={faEnvelope}
          onChangeText={(value, isValid) => onSignInFieldChange('email', value, isValid)}
          rules={['required', 'isEmail']}
          errorMessages={['Email cannot be empty', 'Please enter a valid email address']}
        />
        <TextInputWithValidation
          secureTextEntry
          style={styles.input}
          value={state.signInForm.password}
          label="Password"
          leftIcon={faShieldAlt}
          onChangeText={(value, isValid) => onSignInFieldChange('password', value, isValid)}
          rules={['required']}
          externalError={state.signInForm.errors}
          errorMessages={['Password cannot be empty']}
        />
        <View style={styles.forgotContainer}>
          <Link textStyle={styles.secondLinkStyle} onPress={() => navigation.navigate(screens.FORGOT_PASSWORD_SCREEN)}>Forgot password</Link>
        </View>
      </FormWithValidation>
      <View style={styles.footer}>
        <Link textStyle={styles.firstLinkStyle} onPress={() => navigation.navigate(screens.SIGN_UP_SCREEN)}>Don't have an account?</Link>
        <Link textStyle={styles.secondLinkStyle} onPress={() => navigation.navigate(screens.SIGN_UP_SCREEN)}>Sing Up</Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollview: {
    backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flex: 1,
    width: '100%',
  },
  loginForm: {
    flex: 4,
    width: '100%',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
  },
  firstLinkStyle: {
    color: colors.subTextColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondLinkStyle: {
    color: colors.mainColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTitle: {
    color: colors.subTextColor,
    fontWeight: IS_IOS ? '700' : 'bold',
    marginTop: 15,
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
