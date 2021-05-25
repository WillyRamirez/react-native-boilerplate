import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../Colors';

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
    fontWeight: '900',
    color: colors.mainTextColor,
  },
});

export { Title };
