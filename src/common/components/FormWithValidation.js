import React from 'react';
import { View } from 'react-native';

const FormWithValidation = ({ children, style, validFields, renderSubmitTouchable }) => {
  const ValidatableInputs = children.filter(child => {
    return typeof child.props.rules !== 'undefined';
  });

  const formIsValid = validFields.length === ValidatableInputs.length;

  return (
    <View style={style}>
      {children}
      {renderSubmitTouchable(formIsValid)}
    </View>
  );
};

export default FormWithValidation;
