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