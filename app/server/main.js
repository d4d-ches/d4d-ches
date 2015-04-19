/*
Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");
Received = new Mongo.Collection("received");
*/

Accounts.config({
    // forbidClientAccountCreation: true
});


var twitter = new TwitterApi();
Meteor.methods({
    /**
        Posts a direct message with the given message and recipient.
        params:
            String recipient    The Twitter handle of the recipient
            String message      The text (max. 140 chars; ensure this yourself) to send
        returns:
            true if the Twitter query succeeded, false if failed.
    */
    sendDirectMessage: function(params){
        var result = twitter.post('direct_messages/new.json', {
            screen_name: params.recipient,
            text: params.message
        });
        if(result && result.data){
            // the sent message = result.data
            var message = result.data;
            prepareMessage(message);
            History.insert(message);

            return true;
        }
        else {
            return false;
        }
    },
    /**
        Retrieves the latest direct messages sent to the user and loads them into the Received database.
        params:
            None
        returns:
            true if the Twitter query succeeded, false if failed.
            If it failed, the Received database should still be OK!
    */
    loadDirectMessages: function(){
        var result = twitter.get('direct_messages.json', {
            count: 200 // get as many as possible
        });
        if(result && result.data){
            var messages = result.data;
            // put any new messages into Received database
            // new messages aren't in the database yet
            // new messages will always come before old ones

            for(var i = 0; i < messages.length; i++){
                var message = messages[i];
                if(Received.findOne({id_str: message.id_str}) === undefined){
                    // this isn't in database so add it
                    console.log("Inserting message #" + message.id_str);
                    prepareMessage(message);
                    Received.insert(message);
                }
                else {
                    // it's in database; all future messages will also be in database
                    break;
                }
            }

            return true;
        }
        else {
            // failed
            return false;
        }
    },

    flushDMs: function(){
        Received.remove({});
    },


    /*
        Translates `text` from language `from` to `to`.
        Use the 2-letter code, e.g. "en" for English and "ht" for Haitian Creole.
    */
    translate: function(text, from, to){
        return translate(text, from, to);
    }
});

/*
    Translates `text` from language `from` to `to`.
    Use the 2-letter code, e.g. "en" for English and "ht" for Haitian Creole.
*/
function translate(text, from, to){
    var bt = Meteor.npmRequire('bing-translate').init({
        client_id: 'd4d_ches',
        client_secret: 'VAiLgH+S9Qpj3lImoMsC+nInfp8mbngKbfRhBXA0JTE='
    });

    var response = Async.runSync(function(done) {
        bt.translate(text, from, to, function(err, res) {
            if (!err && res && res.translated_text) {
                done(null, res.translated_text);
            }
            else {
                done(err, null);
            }
        });
    });

    return response.result;
}

/**
    Adds an id to the raw message and translates it.
*/
function prepareMessage(message){
    message._id = message.id_str;

    // auto translate
    message.native_language = message.sender.lang;
    if(message.native_language === "en"){
        message.text_english = message.text;
        message.text_creole = translate(message.text, "en", "ht");
    }
    else {
        message.text_creole = message.text;
        message.text_english = translate(message.text, "ht", "en");
    }
}
