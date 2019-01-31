import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const SignedOutLinks = ({ signIn, register }) => {
    return (
      <Menu.Item position="right">
        <Button onClick={signIn} content="Login" color='green'/>
        <Button
          onClick={register}
          content="Register"
          color='orange'
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
    );
};

export default SignedOutLinks;
