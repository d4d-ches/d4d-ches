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