import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button, Divider } from 'semantic-ui-react';

import TextArea from '../../app/common/form/TextArea';

class BioForm extends Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
  // console.log("Bio form props", this.props);
    return (
      <div>
        <Segment>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="about"
              type="textarea"
              rows={3}
              label='About:'
              component={TextArea}
              placeholder="Something about yourself..."
            />
            <Field
              name="lookingFor"
              type="textarea"
              rows={3}
              label='Looking for:'
              component={TextArea}
              placeholder="Ideal person..."
            />
            <Field
              name="interests"
              type="textarea"
              rows={3}
              label='Interests:'
              component={TextArea}
              placeholder="I like..."
            />
            <Divider/>
            <Button
              disabled={this.props.pristine || this.props.submitting}
              size="large"
              positive
              content="Update Profile"
            />
          </Form>
        </Segment>
      </div>
    );
  };
}

export default reduxForm({
  form: 'bioForm',
  enableReinitialize: true,
  destroyOnUnmount: false
})(BioForm);
