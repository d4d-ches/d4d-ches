Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

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

/**
    Sends the given survey questions to each of the given recipients.
    Get both arguments via Questions.find() and Entrepreneurs.find()
*/
sendSurvey = function(questions, recipients){
   $.each(questions, function(key, question){
        $.each(recipients, function(key, recipient){
            console.log("Send " + question.question_text + " to " + recipient.twitter);
            
            
            var params = {
                recipient: recipient.twitter,
                message: question.question_text
            };
            Meteor.call('sendDirectMessage', params, function(error, result){
                console.log(error);
                console.log(result);
            });
            
        });
    });
}