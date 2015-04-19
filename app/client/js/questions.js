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
    },
    'click .btn-delete': function(event){
        // delete this question
        Questions.remove(this._id);
    },
    'click .btn-save': function(event){
        //update this question
        var props = {};
        $(event.target).closest('tr').children().find('input').each(function(){
            props[$(this).attr('name')] = $(this).val();
        });
        console.log(props);
        Questions.update(this._id, props);
    }
});
