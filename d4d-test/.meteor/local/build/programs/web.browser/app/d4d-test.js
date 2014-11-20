(function(){// your databases here
Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {
    Questions.insert({
    		text:   "Have you eaten your vegetables today?"    
	});
    
  // counter starts at 0
  Session.setDefault("counter", 0);

  /*Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });*/   
    
    Template.body.helpers({
	   questions: function () {
		//return all the questions
        return Questions.find({});   
	}
  });
    
    Template.body.events({
        "submit .new-question": function (event) {
        var question = event.target.input.value;
            
        Questions.insert({
            text: question,
            createdAt: new Date() // current time
        });
        
        //Clear form
        event.target.input.value = "";
        
        //Prevent default form submit
        return false;
        }
    });
}

})();
