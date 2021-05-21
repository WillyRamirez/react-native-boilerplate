import * as Keychain from 'react-native-keychain';

export default {
  set: (key, value) => Keychain.setGenericPassword(key, value, { service: key }),
  get: async key => {
    const value = await Keychain.getGenericPassword(key, { service: key });
    return (value && value.password) || null;
  },
  delete: key => Keychain.resetGenericPassword({ service: key }),
};
