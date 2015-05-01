Template.page_questions.helpers({
    questions: function () {
      return Questions.find({});
    }
});
Template.page_questions.events({
    'submit #add_question': function (event) {
        // add a new question
        var english = event.target.text_english.value;
        if (english === "") {
            return false;
        }
        Meteor.call('translate', english, "en", "ht", function(error, result){
                console.log(error);
                console.log(result);
                    Questions.insert({
                        text_english: english,
                        text_creole: result,
                        created: new Date(),
                        numberSends: 0
                    });


                clearForm(event.target);
        });

        return false;
    },
    'click .btn-delete': function(event){
        // delete this question
        Questions.remove(this._id);

        return false;
    },
    'click .btn-save': function(event){
        //update this question
        var props = {};
        $(event.target).closest('tr').children().find('input').each(function(){
            props[$(this).attr('name')] = $(this).val();
        });
        console.log(props);
        Questions.update(this._id, props);

        return false;
    }
});
