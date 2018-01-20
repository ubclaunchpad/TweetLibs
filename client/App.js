import React, { Component } from 'react';
import MyForm from './MyForm';
import { Router, Route, hashHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitHome = this.handleSubmitHome.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTwitterUserChange = this.handleTwitterUserChange.bind(this);

    this.state = {
    	page: 'home',
    	labels: [],
    	twitter_user: '',
    }
  }

  handleSubmitHome(e) {
  	e.preventDefault();
  	this.fetchData()
  	
  	// mock data for labels
  	this.state.labels = ['noun', 'adjective', 'noun', 'verb'];
  	this.setState({'page': 'myform' });
  }

  handleSubmitForm(e) {
  	e.preventDefault();

  	this.setState({ 'page': 'home' });
  }

  handleTwitterUserChange(e) {
  	this.setState({ 'twitter_user': e.target.value });
  }

  fetchData() {
  	fetch(`http://35.227.181.45/api/tweet?twitter_user=${this.state.twitter_user}`)
  	.then((resp) => resp.json())
  	.then(function(data) {
  		console.log("RESPONSE");
  		console.log(data);
  		// store labels (adjective, noun etc) in this.state.labels

  	})
  	.catch(function(error) {
  		console.log(error);
  	})
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
  				<input type="text" onChange= { this.handleTwitterUserChange } />
        	<button>Submit</button>
      	</form>
    	);
  	}
    
  }
}

export default App;
