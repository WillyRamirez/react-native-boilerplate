import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { colors } from '../Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IS_IOS } from '../Constants';

const Button = ({ children, isDisabled, style, rightIcon, ...rest }) => {

  return (
    <TouchableHighlight
      style={[
        styles.button,
        isDisabled ? styles.disabled : styles.enabled,
        style,
      ]}
      {...rest}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          {children}
        </Text>
        { rightIcon &&
        <FontAwesomeIcon style={styles.icon} icon={rightIcon} />
        }
      </View>
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
    fontWeight: IS_IOS ? '900' : 'bold',
    color: colors.mainColorContrastColor,
  },
  icon: {
    marginLeft: 5,
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
    opacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

});

export { Button };
