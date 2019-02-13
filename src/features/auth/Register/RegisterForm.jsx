import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import moment from 'moment';

import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import DateInput from '../../../app/common/form/DateInput';
import RadioInput from '../../../app/common/form/RadioInput';
// import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser
};

const validate = combineValidators({
  displayName: isRequired('Display Name'),
  email: isRequired('email'),
  password: isRequired('password'),
  dateOfBirth: isRequired('dateOfBirth'),
  gender: isRequired('Gender'),
  city: isRequired('Home Town')
});

const RegisterForm = ({
                        handleSubmit,
                        registerUser,
                        error,
                        invalid,
                        submitting
                      }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="Male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="Female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            // width={8}
            name="dateOfBirth"
            component={DateInput}
            dateFormat='YYYY-MM-DD'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={moment().subtract(18, 'years')}
            // maxDate={subYears(new Date(), 18)}
            placeholder="Date of Birth"
          />
          <Field
            name="city"
            placeholder="Home Town"
            label="City"
            component={TextInput}
            type="text"
            // width={8}
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
            Register
          </Button>
          {/*<Divider horizontal>Or</Divider>*/}
          {/*<SocialLogin socialLogin={socialLogin}/>*/}
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
