import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import UseAuth from '../store/UseAuth';
import { TextInputWithValidation, FormWithValidation, Button, Title } from '../../common/components/';
import { colors } from '../../common/Colors';
import { AuthContext } from '../store/AuthContext';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IS_IOS } from '../../common/Constants';

const ForgotPasswordScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const { onForgotPasswordFieldChange, onForgotPasswordPress } = UseAuth();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
    >
      <View style={styles.titleContainer}>
        <Title>Forgot your password?</Title>
        <Text style={styles.subText}>Confirm your email address and we'll send you instructions to reset your password</Text>
      </View>
      <FormWithValidation
        validFields={state.forgotPasswordForm.validFields}
        style={styles.loginForm}
        renderSubmitTouchable={formIsValid => (
          <Button
            rightIcon={faArrowRight}
            isDisabled={!formIsValid}
            onPress={onForgotPasswordPress}
          >
            <Text>Reset password</Text>
          </Button>
        )}
      >
        <TextInputWithValidation
          style={styles.input}
          value={state.forgotPasswordForm.email}
          label="Email"
          leftIcon={faEnvelope}
          onChangeText={(value, isValid) => onForgotPasswordFieldChange('email', value, isValid)}
          rules={['required', 'isEmail']}
          errorMessages={['Email cannot be empty', 'Please enter a valid email address']}
        />
      </FormWithValidation>
      {state.forgotPasswordForm.success &&
      <Text style={styles.confirmationText}>
        If your email address exists in our database we have sent you an email with instructions.
      </Text>
      }
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    width: '100%',
  },
  loginForm: {
    marginTop: 50,
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
  subText: {
    color: colors.subTextColor,
    fontWeight: IS_IOS ? '700' : 'bold',
    marginTop: 15,
  },
  confirmationText: {
    marginTop: 20,
    color: colors.mainTextColor,
    opacity: 0.7,
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

export default ForgotPasswordScreen;
