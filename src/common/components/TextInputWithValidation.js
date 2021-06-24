import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import validators from './Validators';
import { colors } from '../Colors';
import { IS_IOS } from '../Constants';

const TextInputWithValidation = ({
  rules,
  id,
  onChangeText,
  externalError,
  matchValue,
  errorMessages,
  label,
  leftIcon,
  style,
  value,
  ...rest
}) => {
  const [error, setError] = useState();
  const [isFocused, setFocus] = useState(false);

  const animatedFocus = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    if (externalError) {
      setError(externalError.msg);
    }
  }, [externalError]);

  const isValid = (value) => {
    if (rules) {
      return rules.every((rule, index) => {
        const args = rule.split(/:(.+)/);
        const validator = args.shift();
        const isValid = validators[validator].apply(this, [value, ...args, matchValue]);

        if (!isValid) {
          setError(errorMessages[index]);
        } else {
          setError('');
        }

        return isValid;
      });
    }
  };

  useEffect(() => {
    Animated.timing(animatedFocus, {
      toValue: isFocused || value ? 0 : 25,
      duration: 300,
      easing: Easing.elastic(),
      useNativeDriver: IS_IOS,
    }).start();
  }, [isFocused]);

  const onChange = value => {
    onChangeText(value, isValid(value));
  };

  return (
    <View>
      <Animated.View
        style={[
          styles.container,
          isFocused && styles.focusStyle,
          {
            shadowOpacity: animatedFocus.interpolate({
              inputRange: [0, 25],
              outputRange: [isFocused ? 0.3 : 0, 0],
            }),
          }
        ]}>
        <View>
          <FontAwesomeIcon style={styles.icon} icon={leftIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <Animated.Text
            style={[styles.label, { transform: [{ translateY: animatedFocus }]}]}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={[styles.input, style, isFocused && styles.inputFocus]}
            onChangeText={onChange}
            value={value}
            {...rest}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </View>
      </Animated.View>
      <View>
        <Text style={styles.errorStyles}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.subTextColor,
  },
  icon: {
    marginTop: 10,
    marginHorizontal: 5,
    color: colors.subTextColor,
  },
  inputWrapper: {
    width: '90%',
    height: 56,

  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    color: colors.mainTextColor,
    fontWeight: IS_IOS ? '800' : 'bold',
  },
  focusStyle: {
    backgroundColor: '#ffffff',
    borderBottomColor: 'rgba(169,169, 169, 0.5)',
    shadowColor: 'rgba(169,169, 169, 0.9)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowRadius: 5,
    elevation: 16,
  },
  inputFocus: {
    borderBottomWidth: 0,
  },
  label: {
    shadowOpacity: 0,
    color: colors.subTextColor,
    marginLeft: 3,
    fontSize: 13,
    fontWeight: IS_IOS ? '700' : 'bold',
  },
  errorStyles: {
    marginLeft: 3,
    marginTop: 3,
    marginBottom: 17,
    fontSize: 13,
    fontWeight: IS_IOS ? '700' : 'bold',
    color: 'red',
  },
});

export { TextInputWithValidation };
