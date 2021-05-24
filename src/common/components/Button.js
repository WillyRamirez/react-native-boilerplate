import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

const Button = ({ children, isDisabled, style, ...rest }) => {

  return (
    <TouchableHighlight
      style={[
        styles.button,
        isDisabled ? styles.disabled : styles.enabled,
        style,
      ]}
      {...rest}
    >
      {children}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  enabled: {
    backgroundColor: 'red',
  },
  disabled: {
    backgroundColor: 'grey',
  },
});

export default Button;
