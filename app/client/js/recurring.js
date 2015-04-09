Template.page_recurring.helpers({
    questions: function () {
      return Questions.find({});
    },

});

Template.page_recurring.events({
    'submit #recurring-new': function(event){
        var question = Questions.findOne({ _id: $('#recurring-question').val() });

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
