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

            message._id = message.id_str;

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
                    message._id = message.id_str;
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
    Requests an acccess token, and calls callback(token) when received.
*/
function getAccessToken(callback){
    HTTP.post(
        "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/",
        {
            data: {
                client_id: "d4d_ches",
                client_secret: "VAiLgH+S9Qpj3lImoMsC+nInfp8mbngKbfRhBXA0JTE=",
                scope: "http://api.microsofttranslator.com",
                grant_type: "client_credentials"
            }
        },
        function(data){
            var token = data.access_token;
            console.log(data);
            callback(token);
        }
    );
}

// Write function that grabs access token then uses that to translate example text
// e.g.:
// https://msdn.microsoft.com/en-us/library/ff512385.aspx
function translateToCreole(token){
    HTTP.get(
        "http://api.microsofttranslator.com/V2/Http.svc/Translate/",
        {
            data: {
                appId: "Bearer " + token,
                text: "hello world (example text)",
                from: "en",
                to: "ht",
                contentType: "text/plain"
            }
        },
        function(outdata){
            // TODO add to database
            return outdata;
        }
    );
}
