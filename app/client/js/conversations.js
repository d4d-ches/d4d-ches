Template.page_conversations.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    },
    chosen: function(){
        return Session.get('chosenEntrepreneur');
    },

    all_received_messages: function(){
        // load any new messages, and show them all
        // Received will update whenever loadDirectMessages is finished
        // so asynchronousness doesn't matter
        Meteor.call('loadDirectMessages');
        return Received.find({});
    }
});

// TODO need function to make conversations show only when choice selected
Template.page_conversations.events({
    'change #entrepreneur-chooser': function(){
        var name = $('#entrepreneur-chooser').val();
        Session.set('chosenEntrepreneur', name);
    }
});
