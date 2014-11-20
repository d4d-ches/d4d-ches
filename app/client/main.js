Questions = new Mongo.Collection("questions");
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

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
Accounts.config({
    forbidClientAccountCreation: true 
});



test = function() {
    var term = "test";
    Meteor.call('searchTwitter', term, function(err, result){
        if(!err){
            if (result.statusCode === 200) // This checks if we got a good response
                console.log(result.data); // This is the actual data
        }
        else{
            console.log(err);
        }
    });
}