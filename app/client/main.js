Questions = new Mongo.Collection("questions");
Entrepreneurs = new Mongo.Collection("entrepreneurs");
History = new Mongo.Collection("history");

// Questions page
Template.page_questions.helpers({
    questions: function () {
      return Questions.find({});
    }
});
Template.page_questions.events({
    'submit #add_question': function (event) {
        // add a new question
        Questions.insert({
            question_text: event.target.question_text.value,
            language: "en",
            created: new Date(),
            numberSends: 0
        });

        clearForm(event.target);

        return false;
    }
});

// Entrepreneurs page
Template.page_entrepreneurs.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    }
});
Template.page_entrepreneurs.events({
    'submit #form-add-entrepreneur': function(event){
        var form = event.target;
        Entrepreneurs.insert({
            name:       form.name.value,
            phone:      form.phone.value,
            twitter:    form.twitter.value,
            company:    form.company.value,
            location:   form.location.value,
            field:      form.field.value,
        });
        
        clearForm(form);
        
        return false;
    },
    'click .btn-delete': function(event){
        Entrepreneurs.remove(this._id);
    },
    'click .btn-save': function(event){
        //Entrepreneurs.update(this._id,
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