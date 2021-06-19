import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../Colors';
import { IS_IOS } from '../Constants';

const Title = ({ children }) => {

  return (
      <Text style={styles.text}>
        {children}
      </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: IS_IOS ? '900' : 'bold',
    color: colors.mainTextColor,
  },
});

export { Title };
