Template.page_conversations.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    },
    chosen: function(){
        return Session.get('chosenEntrepreneur');
    },
    messagesFromChosen: function(){
        var entrepreneur = Session.get('chosenEntrepreneur');
        if(entrepreneur){
            var twitter = entrepreneur.twitter;
            return Received.find({
                sender_screen_name: twitter
            });
        }
        else {
            return null;
        }
    },
    messagesToChosen: function(){
        var entrepreneur = Session.get('chosenEntrepreneur');
        if(entrepreneur){
            var twitter = entrepreneur.twitter;
            return History.find({
                recipient_screen_name: twitter
            });
        }
        else {
            return null;
        }
    },
    messagesConversation: function(){
        return messagesConversation();
    },

    all_received_messages: function(){
        return Received.find({});
    },

    compile_check: function(){
        return "hi";
    },

    format_date: function(raw_date){
        // for all formats check: http://momentjs.com/
        return moment(new Date(raw_date)).format('l');
    },

    to_csv: function(){
        return messagesToCSV();
    },

    csv_link: function(){
        return generateCsvLink();
    }
});

Template.page_questions.helpers({
    questions: function () {
      return Questions.find({});
    }
});

Template.page_conversations.events({
    'change #entrepreneur-chooser': function(){
        // deduce entrepreneur from twitter handle
        var twitter = $('#entrepreneur-chooser').val();
        var entrepreneur = Entrepreneurs.findOne({twitter: twitter});
        Session.set('chosenEntrepreneur', entrepreneur);
    },
    'click .btn-resend': function(event){
    	//this should resend the message when the button is clicked
    	var button = event.target;
    	var id = $(button).data('id');
    	var history = History.findOne(id);

    var params = {
                recipient: history.recipient_screen_name,
                message: history.text
            };
            Meteor.call('sendDirectMessage', params, function(error, result){
                console.log(error);
                console.log(result);
            });
    }
});

/**
    Returns a list of all messages received from the chosen entrepreneur.
*/
function messagesFromChosen(){
    var entrepreneur = Session.get('chosenEntrepreneur');
    if(entrepreneur){
        var twitter = entrepreneur.twitter;
        return Received.find({
            sender_screen_name: twitter
        }).fetch();
    }
    else {
        return null;
    }
}

/**
    Returns a list of all messages sent to the chosen entrepreneur.
*/
function messagesToChosen(){
    var entrepreneur = Session.get('chosenEntrepreneur');
    if(entrepreneur){
        var twitter = entrepreneur.twitter;
        return History.find({
            recipient_screen_name: twitter
        }).fetch();
    }
    else {
        return null;
    }
}

/**
    Returns a sorted list of all messages exchanged between you and the chosen entrepreneur.
*/
function messagesConversation(){
    var entrepreneur = Session.get('chosenEntrepreneur');
    var to_chosen = messagesToChosen();
    var from_chosen = messagesFromChosen();
    var conversation = _.union(to_chosen, from_chosen);
    var sorted = _.sortBy(conversation, function(item){
        return -1 * moment(new Date(item.created_at)).unix();
    });
    _.each(sorted, function(message){
        if (message.sender_screen_name === entrepreneur.twitter){
            message.received = true;
        };
    });
    return sorted;
}

/**
    Convert the output of messagesConversation() in conversations.js into CSV format (sender, recipient, timestamp, text)
*/
function messagesToCSV(){
    var tweets = messagesConversation();
    var lines = _.map(tweets, function(tweet){
        return _([
            tweet.sender_screen_name,
            tweet.recipient_screen_name,
            tweet.text,
            moment(new Date(tweet.created_at)).format('l')
        ]).map(function(item){
            return '"' + item + '"'
        }).join(",");
    });
    var body = lines.join("\n");
    var header = [
        "Sender",
        "Recipient",
        "Text",
        "Sent at"
    ].join(",");
    var contents = header + "\n" + body;
    return contents;
}

/**
    Generates a link to download the current conversation as a CSV;
    the href of an <a> element can be set to this.
*/
function generateCsvLink(){
    return "data:text/csv;base64," + btoa(messagesToCSV());
}
