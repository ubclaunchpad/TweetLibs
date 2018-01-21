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
    	twitter_user: 'realdonaldtrump',
    	tweet_text: '',
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
  }

  handleSubmitForm(e) {
  	e.preventDefault();
    
    const values = Array.from(document.querySelectorAll("input")).map(e => e.value);

    let tweetText = this.state.tweet.text;

    values.forEach(value => {
        tweetText = tweetText.replace(/{noun}|{verb}|{adjective}/, value); 
    });
    
      let tweet = this.state.tweet;
      tweet.text = tweetText;

  	this.setState({ 'page': 'tweet', tweet });
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
  		this.setState({'tweet': this.getTweetData(data)});
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

    getTweetData(data) {
        return {
            avatarURL: data.avatar_url,
            name: data.name,
            screenName: "@" + data.user,
            text: data.new_text,
            date: data.created_at,
            replies: 46514,
            retweets: data.retweet_count,
            likes: data.favorite_count
        }
    }

    render(){

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
            <div className="username-input">
            <span className="at-sign">@</span>
  				<input type="text" defaultValue="realdonaldtrump" onChange= { this.handleTwitterUserChange } />
            </div>
  				<label>username</label>
        	<button>Submit</button>
      	</form>
    	);
  	}

    return (
        <div>
        <div className="title-bar">
        <div className="title">TweetLibs</div>
        <img className="logo" src="https://www.sketchappsources.com/resources/source-image/twitterlogo_1x.png" />
        </div>
        <div className="center">
        {Content}
        </div>
        </div>
    );
    
  }
}

export default App;
