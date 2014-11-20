(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw('<!-- put a header bar here! -->\n    <nav class="navbar navbar-default" role="navigation">\n  <div class="container-fluid">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">Brand</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n      <ul class="nav navbar-nav navbar-right nav-tabs">\n        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>\n            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>\n            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>\n            <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>       \n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n    <!-- tab contents here -->\n    \n    \n    <!-- test for the past -->\n  <h1>Survey questions!!!!</h1>\n    <div class="tab-content">\n        <div role="tabpanel" class="tab-pane active" id="home">...</div>\n        <div role="tabpanel" class="tab-pane" id="profile">...</div>\n        <div role="tabpanel" class="tab-pane" id="messages">...</div>\n        <div role="tabpanel" class="tab-pane" id="settings">...</div>\n      </div>\n    '), Spacebars.include(view.lookupTemplate("loginButtons")), HTML.Raw('\n  \n  <form class="new-question">\n  	<input type="text" name="text" placeholder="Survey question" class="form-control">\n  	<button type="submit" class="btn btn-default">Add</button>\n  </form>\n  \n  '), HTML.UL("\n  	", Blaze.Each(function() {
    return Spacebars.call(view.lookup("questions"));
  }, function() {
    return [ "\n  		", Spacebars.include(view.lookupTemplate("question")), "     \n  	" ];
  }), "\n  ") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("question");
Template["question"] = new Template("Template.question", (function() {
  var view = this;
  return HTML.LI("\n		", HTML.SPAN(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("text"));
  })), "\n  	");
}));

})();
