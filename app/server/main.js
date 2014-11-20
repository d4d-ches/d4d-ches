Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

Accounts.config({
    forbidClientAccountCreation: true 
});

var twitter = new TwitterApi();
Meteor.methods({
    searchTwitter: function(term) {
        return twitter.search(term);
    }
});