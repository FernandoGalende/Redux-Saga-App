import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserRequest } from '../actions/users';

class App extends Component {
  constructor(props){
    super(props);
    this.props.getUserRequest();
  }
  render(){

    return (
      <div>
        testing
        {}
      </div>
    );
  }
}

export default connect(null,{
  getUserRequest
})(App);
