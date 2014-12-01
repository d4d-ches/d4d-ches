$(function(){
    Template.page_send.helpers({
        questions: function () {
          return Questions.find({});
        },
   
        entrepreneurs: function(){
            return Entrepreneurs.find({});
        }
    });
});
/*
$(function(){
    Template.entrepreneur_template({
        questions: function () {
          return Questions.find({});
        },
   
        entrepreneurs: function(){
        return Entrepreneurs.find({});
    }
    });
});
*/
