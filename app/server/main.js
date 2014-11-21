Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

Accounts.config({
    forbidClientAccountCreation: true 
});


var twitter = new TwitterApi();
Meteor.methods({
    search: function () {
      return twitter.search("harvard");
    },
    run: function(){
        return twitter;
    },
    bet: function(){
        return 5;
    },
    sendDirectMessage: function(params){
        return twitter.post('direct_messages/new.json', { 
            screen_name: params.recipient,
            text: params.message
        });
    },
    getDirectMessages: function(){
        return twitter.get('direct_messages.json');
    }
});

/*
Meteor.methods({
    test: function(){
        var Twit = Meteor.npmRequire('twit');

        var T = new Twit({
            consumer_key:         'BXFSdIp8GliNro3dcYULg4UYd'
          , consumer_secret:      'ET1fWXCknxlQL65qMzXDLYoODFKoJ34zPM4jmqngwlOwDnMp2S'
          , access_token:         '2849952455-weMu06rs7pWlSkXg0tpTkYuqy4y5KCFh9NoTpyR'
          , access_token_secret:  'yGEVlRmiTmFE3syHC97pwZfunMcEOg2PW8GDZC8eVmHp4'
        });

        //
        //  tweet 'hello world!'
        //
        T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
          console.log(data)
        });    
    }
});
*/