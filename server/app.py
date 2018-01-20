import os

from flask import Flask, request, jsonify
from textblob import TextBlob
import tweepy

import random

app = Flask(__name__)


# Credentials from environmnent.
consumer_key = os.environ.get('TWITTER_CONSUMER_KEY')
consumer_secret = os.environ.get('TWITTER_CONSUMER_SECRET')
access_token = os.environ.get('TWITTER_ACCESS_TOKEN')
access_token_secret = os.environ.get('TWITTER_ACCESS_TOKEN_SECRET')

TWITTER_AUTH = tweepy.OAuthHandler(consumer_key, consumer_secret)
TWITTER_AUTH.set_access_token(access_token, access_token_secret)
TWITTER_API = tweepy.API(TWITTER_AUTH)

# In case you forget to send user :/ - no 400's here!
DEFAULT_USER = 'RealDonaldTrump'


@app.route('/api/tweet')
def get_tweet():
    """Returns payload like"""
    twitter_user = request.args.get('twitter_user', DEFAULT_USER)

    # Use tweet_mode='extended' to get full 280 char tweets
    tweets = TWITTER_API.user_timeline(
        twitter_user,
        tweet_mode='extended'
    )

    # Collect a random tweet, process it.
    status = tweets[random.randint(0, len(tweets) - 1)]

    new_text = status.full_text
    blob = TextBlob(status.full_text)

    # Separate categories to replace.
    nouns = [word for word, tag in blob.tags if tag == 'NN']
    nouns += blob.noun_phrases
    verbs = [word for word, tag in blob.tags if tag in ('VB', 'VBG')]

    # Only repleace things that are actually words.
    for noun in nouns:
        if noun in blob.words:
            new_text = new_text.replace(noun, '{noun}')

    for verb in verbs:
        if verb in blob.words:
            new_text = new_text.replace(verb, '{verb}')

    return jsonify({
        "user": twitter_user,
        "name": status.author.name,
        "original_text": status.full_text,
        "new_text": new_text,
        "avatar_url": status.author.profile_image_url,
        "favorite_count": status.favorite_count,
        "retweet_count": status.retweet_count,
        "created_at": status.created_at,
        "nouns": nouns,
        "verbs": verbs,
        "verified": status.author.verified,
        "tweet_id": status.id,
    })


if __name__ == '__main__':
    app.run('0.0.0.0', 8080)
