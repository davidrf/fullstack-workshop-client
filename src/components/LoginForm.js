/*
TODO: Creating a mutation component (part 1):

1. Create a Mutation component to login the user.
2. You should wrap the Form component in a mutation component and pass the login function down as a prop.
3. Use the onCompleted prop on Mutation to set the user's token in localStorage
*/

/*
TODO: Apollo Link State:

1. Refactor the setState calls to client.writeData calls to set whether the user is logged in
2. Query whether the user is logged in one level above the Mutation component.
*/

import React, { Component } from 'react';

const Form = ({ isLoggedIn, login, logout }) => {
  let input = React.createRef();

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            const email = input.current.value;
            login({
              variables: { email },
            });
          }}
        >
          <input type="text" ref={input} placeholder="Email" />
          <button className="button">Log in</button>
        </form>
      )}
    </div>
  );
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token');

    this.state = {
      isLoggedIn: !!token,
    };
  }

  logout = () => {
    this.setState({ isLoggedIn: false }, () => localStorage.clear());
  };

  render = () => (
    <Form
      login={() => {}}
      logout={this.logout}
      isLoggedIn={this.state.isLoggedIn}
    />
  );
}

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
