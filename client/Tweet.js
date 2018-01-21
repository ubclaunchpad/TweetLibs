import React from 'react';

class Tweet extends React.Component {

  render() {
      return (
    <div className="tweet-root">
        <div className="tweet-content">
            <div className="tweet-header">
                <img className="tweet-avatar" src={this.props.tweet.avatarURL}/>
                <div className="tweet-author"> 
                    <div className="tweet-author-name">
                        {this.props.tweet.name}
                    </div>
                    <div className="tweet-author-screenname"> 
                        {this.props.tweet.screenName}
                    </div>
                </div>
            </div>
            <div className="tweet-body">
                <p className="tweet-text">
                    {this.props.tweet.text}
                </p>
                <div className="tweet-date">
                    {this.props.tweet.date}
                </div>
                <div className="tweet-actions">
                    <span className="tweet-action">{this.props.tweet.replies}</span>
                    <span className="tweet-action">{this.props.tweet.retweets}</span>
                    <span className="tweet-action">{this.props.tweet.likes}</span>
                </div>
            </div>
        </div>
    </div>
      );
  }
}

export default Tweet;
