import React, { Component } from 'react';
import MyForm from './MyForm';
import Tweet from './Tweet';

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
        tweet: {
            avatarURL: "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg",
            name: "Donald J. Trump",
            screenName: "@realDonaldTrump",
            text: "Democrats are holding our Military hostage over their desire to have unchecked illegal immigration. Can’t let that happen!",
            date: "6:27 AM - Jan 20, 2018",
            replies: 46514,
            retweets: 8443,
            likes: 10242
        }
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

  	this.setState({ 'page': 'tweet' });
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
 
    let Content;

  	if (this.state.page == 'myform') {
  		Content = (<MyForm onSubmit= { this.handleSubmitForm } labels= { this.state.labels }> </MyForm>)
  	}
  	else if (this.state.page == 'tweet') {
  		Content = (<Tweet tweet={this.state.tweet}/>);
  	}
  	else if (this.state.page == 'home') {
  		Content = (
      	<form onSubmit={ this.handleSubmitHome }>	
  				<label>Choose tweeter</label>
  				<input type="text" />
        	<button>Submit</button>
      	</form>
    	);
  	}

    return (
        <div className="center">
        {Content}
        </div>
    );
   
  }
}

export default App;
