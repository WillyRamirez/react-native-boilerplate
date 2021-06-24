import React from 'react';
import { StyleSheet, View } from 'react-native';

const FormWithValidation = ({ children, style, validFields, renderSubmitTouchable }) => {

  let ValidatableInputs = [];

  React.Children.map(children, (child, i) => {
    if (typeof child.props.rules !== 'undefined') {
      return ValidatableInputs.push(child);
    }
  });

  const formIsValid = validFields.length === ValidatableInputs.length;

  return (
    <View style={style}>
      {children}
      <View style={styles.buttonContainer}>
        {renderSubmitTouchable(formIsValid)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
  },
});

export { FormWithValidation };
