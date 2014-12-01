Template.page_send.helpers({
    questions: function () {
      return Questions.find({});
    },

    entrepreneurs: function(){
        return Entrepreneurs.find({});
    }
});

Template.page_send.events({
    'submit #form-send': function(event){
        var form = event.target;
        F = form;
        
        var questions = [];
        $(form.questions).each(function(id, input){
            if(input.checked){
                questions.push(Questions.findOne({ _id: input.value })); 
            }
        });
        
        var entrepreneurs = [];
        $(form.entrepreneurs).each(function(id, input){
            if(input.checked){
                entrepreneurs.push(Entrepreneurs.findOne({ _id: input.value })); 
            }
        });
        
        console.log(questions);
        console.log(entrepreneurs);
        
        sendSurvey(questions, entrepreneurs);
        
        return false;
    }
});
