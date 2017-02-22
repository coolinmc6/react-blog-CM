import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Hello React! (root component App)</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;
