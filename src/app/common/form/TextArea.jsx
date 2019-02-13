import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextArea = ({ input, rows, type, placeholder, label, meta: { touched, error } }) => {
  return (
    <Form.Field  >
      <Form.TextArea {...input} placeholder={placeholder} rows={rows} label={label}/>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;
