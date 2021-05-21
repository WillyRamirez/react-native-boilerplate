import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import UseAuth from '../../authentication/store/UseAuth';

const HomeScreen = () => {
  const { onLogoutPress, testa } = UseAuth();

  return (
    <View>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={onLogoutPress}
      >
        <Text>Log out</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={testa}
      >
        <Text>test</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
