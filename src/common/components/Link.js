import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../Colors';

const Link = ({
  onPress,
  children,
  style,
  color = colors.mainColor,
  disabled = false,
  textStyle,
              }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[styles.buttonStyle, style]}
  >
    <Text style={[{ color }, styles.textStyle, disabled ? styles.disabled : '', textStyle]}>
      {children}
    </Text>
  </TouchableOpacity>
);

Link.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.shape(),
};

Link.defaultProps = {
  color: colors.mainTextColor,
  disabled: false,
  children: {},
  style: {},
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Link };
