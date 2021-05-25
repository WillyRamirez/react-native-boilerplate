import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, Easing } from 'react-native';
import validators from './Validators';
import { colors } from '../Colors';

const TextInputWithValidation = ({
  rules,
  id,
  onChangeText,
  externalError,
  matchValue,
  errorMessages,
  label,
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
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const onChange = value => {
    onChangeText(value, isValid(value));
  };

  return (
    <View>
      <Animated.View
        style={[
          styles.inputWrapper,
          isFocused && styles.focusStyle,
          {
            shadowOpacity: animatedFocus.interpolate({
              inputRange: [0, 25],
              outputRange: [isFocused ? 0.3 : 0, 0],
            }),
          }
        ]}>
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
      </Animated.View>
      <View>
        <Text style={styles.errorStyles}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    height: 56,
  },
  input: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.subTextColor,
    color: colors.mainTextColor,
    fontWeight: '800',
  },
  focusStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(169,169, 169, 0.5)',
    shadowColor: 'rgba(169,169, 169, 0.9)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  inputFocus: {
    borderBottomWidth: 0,
  },
  label: {
    shadowOpacity: 0,
    color: colors.subTextColor,
    marginLeft: 3,
    fontSize: 13,
    fontWeight: '900',
  },
  errorStyles: {
    marginLeft: 3,
    marginTop: 3,
    marginBottom: 17,
    fontSize: 13,
    fontWeight: '700',
    color: 'red',
  },
});

export { TextInputWithValidation };
