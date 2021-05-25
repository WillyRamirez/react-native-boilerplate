import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import { colors } from '../Colors';

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
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 5,
    backgroundColor: colors.mainColor,
  },
  text: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.mainColorContrastColor,
  },
  enabled: {
    shadowColor: colors.mainColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
    elevation: 1,
  },
  disabled: {
    opacity: 0.5
  },
});

export { Button };
