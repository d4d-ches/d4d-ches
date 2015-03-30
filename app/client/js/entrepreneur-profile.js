Template.page_ent_prof.helpers({
    entrepreneurs: function(){
        return Entrepreneurs.find({});
    },
    chosen: function(){
        return Session.get('chosenEntrepreneur');
    }
});

// TODO need function to make profile show only when choice selected
Template.page_ent_prof.events({
    'change #entrepreneur-chooser': function(){
        var twitter = $('#entrepreneur-chooser').val();
        var entrepreneur = Entrepreneurs.findOne({twitter: twitter});
        Session.set('chosenEntrepreneur', entrepreneur);
    }
});
