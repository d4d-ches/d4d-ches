Template.page_conversations.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    }
});

// TODO need function to make conversations show only when choice selected