(function(){Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

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

// At the bottom of the client code
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
Accounts.config({
    forbidClientAccountCreation: true 
});

})();
