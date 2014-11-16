// your databases here
Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {
    Questions.insert({
        text:   "Have you eaten your vegetables today?"    
    });
  Template.body.helpers({
    questions: function () {
      return Questions.find({});
    }
  });

  Template.body.events({
    'submit .new-question': function (event) {
        // add a new question
        var text = event.target.text.value;
        Questions.insert({
            text:  text
        });
        
        event.target.text.value = null;
        
        return false;
    }
  });
}