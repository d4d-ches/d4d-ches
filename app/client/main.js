/*
Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");
Received = new Mongo.Collection("received");
*/

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY",
});
Accounts.config({
    forbidClientAccountCreation: true
});

/* initialization */
// load any new direct messages into the database
Meteor.call('loadDirectMessages');

UI.registerHelper("selectedIfEqual", function(a, b) {
  if(a === b){
      return "selected";
  }
  else {
      return "";
  }
});
// {{selectedIfEqual "en" lang}}
