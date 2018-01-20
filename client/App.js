import React, { Component } from 'react';
import MyForm from './MyForm';
import { Router, Route, hashHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitHome = this.handleSubmitHome.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);

    this.state = {
    	page: 'home',
    	labels: [],
    	tweeter: '',
    }
  }

  handleSubmitHome(e) {
  	console.log(e);
  	e.preventDefault();
  	// send request for tweets and store result in this.state.labels
  	// mock data 
  	this.state.labels = ['noun', 'adjective', 'noun', 'verb'];
  	this.setState({'page': 'myform' });
  }

  handleSubmitForm(e) {
  	e.preventDefault();

  	this.setState({ 'page': 'home' });
  }

  render() {
  	if (this.state.page == 'myform') {
  		return (<MyForm onSubmit= { this.handleSubmitForm } labels= { this.state.labels }> </MyForm>)
  	}
  	else if (this.state.page == 'tweetResult') {
  		return;
  	}
  	else if (this.state.page == 'home') {
  		return (
      	<form onSubmit={ this.handleSubmitHome }>	
  				<label>Choose tweeter</label>
  				<input type="text" />
        	<button>Submit</button>
      	</form>
    	);
  	}
    
  }
}

export default App;
