/**
    Clears all the inputs in the given form.
    In an event handler, form = event.target.
*/
clearForm = function(form){
    $(form).children().each(function(){
        $(this).find('input').val(null);    
    });
}