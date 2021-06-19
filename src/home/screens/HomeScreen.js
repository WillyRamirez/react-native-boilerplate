import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UseAuth from '../../authentication/store/UseAuth';

const HomeScreen = () => {
  const { onLogoutPress, testa } = UseAuth();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollview}
      enableOnAndroid
    >
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
      <TextInput style={{ marginTop: 400, width: '100%', height: 40, borderWidth: 2, }}/>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
