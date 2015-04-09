Template.page_recurring.helpers({
    questions: function () {
      return Questions.find({});
    },

});

Template.page_send.events({
    'submit #recurring-new': function(event){
        var form = event.target;

        /*
            TODO
            grab question, timing
            store in recurring
            also store last_sent

            in init, check if now - last_sent > recurring_period; if so send and reset last_sent

        */

        return false;
    }
});
