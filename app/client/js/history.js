Template.page_history.helpers({
    all: function(){
        return History.find({});
    },

    filtered: function(){
    	var date = Session.get('date');
    	if(!date){
    		return History.find({});
    	}
    	else{
    		return History.find({
    			"sent": date
    		});
    	}
    }
});

Template.page_history.events({
	'submit #history-filter': function(event){
		// figure out what date they chose
		var form = $(event.target);
		var month = form.find('#history-month').val();
		var day = form.find('#history-day').val();
		var year = form.find('#history-year').val();
        var date = moment(new Date(month + " " + day + ", " + year)).format("MMMM D, YYYY");
		Session.set('date', date);

        return false;
	},
    'click #clear-filter': function(event){
        Session.set('date', null);
        return false;
    }
});
