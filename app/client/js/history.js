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

Template.datepicker.helpers({
    months: function(){
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    },
    days: function(){
        return _.range(1, 31 + 1);
    },
    years: function(){
        return _.range(2014, moment().year() + 1);
    }
});

Template.page_history.events({
	'click #set-date-filter': function(event){
        // finds the date encoded within the given datepicker wrapper.
        function grabDate(parent){
            var month = parent.find('#history-month').val();
    		var day = parent.find('#history-day').val();
    		var year = parent.find('#history-year').val();
            var date = moment(new Date(month + " " + day + ", " + year));
            return date;
        };

        var start = grabDate($('#date-start'));
        var end = grabDate($('#date-end'));

        Session.set('dateStart', start);
        Session.set('dateEnd', end);

        return false;
	},
    'click #clear-date-filter': function(event){
        Session.set('date', null);
        return false;
    }
});
