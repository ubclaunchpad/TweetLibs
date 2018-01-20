import React, { Component } from 'react';
import MyForm from './MyForm';
import { Router, Route, hashHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
    	submitted: false,
    	labels: [],
    }
  }

  handleSubmit(e) {
  	e.preventDefault();
  	// send request for tweets and store result in this.state.labels
  	// mock data 
  	this.state.labels = ['noun', 'test2'];
  	this.setState({'submitted': true });
  }

  render() {
  	if (this.state.submitted) {
  		return (<MyForm labels= { this.state.labels }> </MyForm>)
  	}
  	else {
  		return (
      	<form onSubmit={ this.handleSubmit }>	
  				<label>Choose tweeter</label>
  				<input type="text" />
        <button>Submit</button>
      </form>
    );
  	}
    
  }
}

export default App;
