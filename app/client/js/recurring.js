Template.page_recurring.helpers({
    questions: function () {
      return Questions.find({});
    },

});

Template.page_send.events({
    'submit #recurring-new': function(event){
        var form = event.target;

        return false;
    }
});
