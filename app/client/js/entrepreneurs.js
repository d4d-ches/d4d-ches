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
        // delete this entrepreneur
        Entrepreneurs.remove(this._id);
    },
    'click .btn-save': function(event){
        // update this entrepreneur
        var props = {};
        $(event.target).closest('tr').children().find('input').each(function(){
            props[$(this).attr('name')] = $(this).val();
        });
        console.log(props);
        Entrepreneurs.update(this._id, props);
    }
    // TODO whenever you edit a field, the row's "send" button becomes editable
});