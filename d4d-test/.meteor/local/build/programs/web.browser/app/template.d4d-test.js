(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw('<h1>Welcome to Meteor!</h1>\n    \n    <form class="new-question">\n        <input type="text" name="input" placeholder="Add a Question!">\n        <button type="submit">Submit</button>\n    </form>\n    \n    '), HTML.UL("\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("questions"));
  }, function() {
    return [ "\n            ", Spacebars.include(view.lookupTemplate("question")), "\n        " ];
  }), "\n    ") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("question");
Template["question"] = new Template("Template.question", (function() {
  var view = this;
  return HTML.LI(Blaze.View(function() {
    return Spacebars.mustache(view.lookup("text"));
  }));
}));

})();
