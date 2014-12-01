Template.page_send.helpers({
    questions: function () {
      return Questions.find({});
    },

    entrepreneurs: function(){
        return Entrepreneurs.find({});
    }
});

Template.page_send.events({
    'click #btn-send': function(event){
        sendSurvey(Questions.find({}), Entrepreneurs.find({}));
    }
});
