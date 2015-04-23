$(function(){
    $('#send-confirmation').slideUp();
});

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

        $('#send-confirmation').slideDown();

        return false;
    }
});



/**
    Sends the given survey questions to each of the given recipients.
    Get both arguments via Questions.find() and Entrepreneurs.find()
*/
function sendSurvey(questions, recipients){
   $.each(questions, function(key, question){
        $.each(recipients, function(key, recipient){
            console.log("Send " + question.question_text + " to " + recipient.twitter);
            console.log(question);

            var params = {
                recipient: recipient,
                message: question
            };
            Meteor.call('sendDirectMessage', params, function(error, result){
                console.log(error);
                console.log(result);
            });

        });
    });
}
