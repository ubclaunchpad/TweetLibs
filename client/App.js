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
    	tweet_text: '',
    }
  }

  handleSubmitHome(e) {
  	e.preventDefault();
  	this.fetchData()
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
  	.then( resp => resp.json())
  	.then( data => {
  		// store labels (adjective, noun etc) in this.state.labels
  		this.setState({'labels': this.parseNewText(data.new_text)});
  		this.setState({'tweet_text': data.new_text});
  		this.setState({'page': 'myform' });

  	})
  	.catch(function(error) {
  		console.log(error);
  	})
  }

  // retrieve list of "noun, verb, adj" etc
  parseNewText(text) {
  	var regExp = /{noun}|{verb}|{adjective}/g;
		var matches = text.match(regExp);
		for (var i = 0; i < matches.length; i++) {
			matches[i] = matches[i].replace("{", "");
			matches[i] = matches[i].replace("}", "");
		}
		return matches;
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
