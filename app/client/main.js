Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

Template.page_questions.helpers({
    questions: function () {
      return Questions.find({});
    }
});

Template.page_questions.events({
    'submit #add_question': function (event) {
        // add a new question
        var text = event.target.question_text.value;
        Questions.insert({
            text: text,
            language: "en",
            created: new Date(),
            numberSends: 0
        });

        event.target.question_text.value = null;

        return false;
    }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
Accounts.config({
    forbidClientAccountCreation: true 
});

test = function() {
    Meteor.call('bet');
    console.log("worked");
}

run = function(name){
    if(!name) name = 'run';
    Meteor.call(name, function(error, result){
        console.log(R = JSON.parse(result.content)); 
    });
}