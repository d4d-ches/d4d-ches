Template.page_conversations.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    },
    chosen: function(){
        var entrepreneur = Session.get('chosenEntrepreneur');
        if(entrepreneur){
            return entrepreneur.name;
        }
        else {
            return "";
        }
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

    all_received_messages: function(){
        return Received.find({});
    }
});

// TODO need function to make conversations show only when choice selected
Template.page_conversations.events({
    'change #entrepreneur-chooser': function(){
        // deduce entrepreneur from twitter handle
        var twitter = $('#entrepreneur-chooser').val();
        var entrepreneur = Entrepreneurs.findOne({twitter: twitter});
        Session.set('chosenEntrepreneur', entrepreneur);
    }
});
