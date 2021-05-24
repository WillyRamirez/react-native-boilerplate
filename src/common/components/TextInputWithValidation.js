import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import validators from './Validators';

const TextInputWithValidation = ({
  rules,
  id,
  onChangeText,
  externalError,
  matchValue,
  errorMessages,
  ...rest
}) => {
  const [error, setError] = useState();

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

  const onChange = value => {
    onChangeText(value, isValid(value));
  };

  return (
    <View>
      <TextInput onChangeText={onChange} {...rest} />
      <View>
        <Text style={styles.errorStyles}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorStyles: {
    color: 'red',
  },
});

export default TextInputWithValidation;
