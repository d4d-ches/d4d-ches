//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Session = Package.session.Session;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var passwordSignupFields, displayName, getLoginServices, hasPasswordService, dropdown, validateUsername, validateEmail, validatePassword;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/accounts_ui.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @summary Accounts UI                                                                                                // 2
 * @namespace                                                                                                          // 3
 * @memberOf Accounts                                                                                                  // 4
 */                                                                                                                    // 5
Accounts.ui = {};                                                                                                      // 6
                                                                                                                       // 7
Accounts.ui._options = {                                                                                               // 8
  requestPermissions: {},                                                                                              // 9
  requestOfflineToken: {},                                                                                             // 10
  forceApprovalPrompt: {}                                                                                              // 11
};                                                                                                                     // 12
                                                                                                                       // 13
// XXX refactor duplicated code in this function                                                                       // 14
                                                                                                                       // 15
/**                                                                                                                    // 16
 * @summary Configure the behavior of [`{{> loginButtons}}`](#accountsui).                                             // 17
 * @locus Client                                                                                                       // 18
 * @param {Object} options                                                                                             // 19
 * @param {Object} options.requestPermissions Which [permissions](#requestpermissions) to request from the user for each external service.
 * @param {Object} options.requestOfflineToken To ask the user for permission to act on their behalf when offline, map the relevant external service to `true`. Currently only supported with Google. See [Meteor.loginWithExternalService](#meteor_loginwithexternalservice) for more details.
 * @param {Object} options.forceApprovalPrompt If true, forces the user to approve the app's permissions, even if previously approved. Currently only supported with Google.
 * @param {String} options.passwordSignupFields Which fields to display in the user creation form. One of '`USERNAME_AND_EMAIL`', '`USERNAME_AND_OPTIONAL_EMAIL`', '`USERNAME_ONLY`', or '`EMAIL_ONLY`' (default).
 */                                                                                                                    // 24
Accounts.ui.config = function(options) {                                                                               // 25
  // validate options keys                                                                                             // 26
  var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'requestOfflineToken', 'forceApprovalPrompt'];       // 27
  _.each(_.keys(options), function (key) {                                                                             // 28
    if (!_.contains(VALID_KEYS, key))                                                                                  // 29
      throw new Error("Accounts.ui.config: Invalid key: " + key);                                                      // 30
  });                                                                                                                  // 31
                                                                                                                       // 32
  // deal with `passwordSignupFields`                                                                                  // 33
  if (options.passwordSignupFields) {                                                                                  // 34
    if (_.contains([                                                                                                   // 35
      "USERNAME_AND_EMAIL",                                                                                            // 36
      "USERNAME_AND_OPTIONAL_EMAIL",                                                                                   // 37
      "USERNAME_ONLY",                                                                                                 // 38
      "EMAIL_ONLY"                                                                                                     // 39
    ], options.passwordSignupFields)) {                                                                                // 40
      if (Accounts.ui._options.passwordSignupFields)                                                                   // 41
        throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                        // 42
      else                                                                                                             // 43
        Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                      // 44
    } else {                                                                                                           // 45
      throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
    }                                                                                                                  // 47
  }                                                                                                                    // 48
                                                                                                                       // 49
  // deal with `requestPermissions`                                                                                    // 50
  if (options.requestPermissions) {                                                                                    // 51
    _.each(options.requestPermissions, function (scope, service) {                                                     // 52
      if (Accounts.ui._options.requestPermissions[service]) {                                                          // 53
        throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);           // 54
      } else if (!(scope instanceof Array)) {                                                                          // 55
        throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                        // 56
      } else {                                                                                                         // 57
        Accounts.ui._options.requestPermissions[service] = scope;                                                      // 58
      }                                                                                                                // 59
    });                                                                                                                // 60
  }                                                                                                                    // 61
                                                                                                                       // 62
  // deal with `requestOfflineToken`                                                                                   // 63
  if (options.requestOfflineToken) {                                                                                   // 64
    _.each(options.requestOfflineToken, function (value, service) {                                                    // 65
      if (service !== 'google')                                                                                        // 66
        throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");   // 67
                                                                                                                       // 68
      if (Accounts.ui._options.requestOfflineToken[service]) {                                                         // 69
        throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);          // 70
      } else {                                                                                                         // 71
        Accounts.ui._options.requestOfflineToken[service] = value;                                                     // 72
      }                                                                                                                // 73
    });                                                                                                                // 74
  }                                                                                                                    // 75
                                                                                                                       // 76
  // deal with `forceApprovalPrompt`                                                                                   // 77
  if (options.forceApprovalPrompt) {                                                                                   // 78
    _.each(options.forceApprovalPrompt, function (value, service) {                                                    // 79
      if (service !== 'google')                                                                                        // 80
        throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");   // 81
                                                                                                                       // 82
      if (Accounts.ui._options.forceApprovalPrompt[service]) {                                                         // 83
        throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);          // 84
      } else {                                                                                                         // 85
        Accounts.ui._options.forceApprovalPrompt[service] = value;                                                     // 86
      }                                                                                                                // 87
    });                                                                                                                // 88
  }                                                                                                                    // 89
};                                                                                                                     // 90
                                                                                                                       // 91
passwordSignupFields = function () {                                                                                   // 92
  return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                    // 93
};                                                                                                                     // 94
                                                                                                                       // 95
                                                                                                                       // 96
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("loginButtons");                                                                                  // 2
Template["loginButtons"] = new Template("Template.loginButtons", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: "login-buttons",                                                                                               // 6
    "class": function() {                                                                                              // 7
      return [ "login-buttons-dropdown-align-", Spacebars.mustache(view.lookup("align")) ];                            // 8
    }                                                                                                                  // 9
  }, "\n    ", Blaze.If(function() {                                                                                   // 10
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 11
  }, function() {                                                                                                      // 12
    return [ "\n      ", Blaze.If(function() {                                                                         // 13
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 14
    }, function() {                                                                                                    // 15
      return [ "\n        \n        ", Blaze.If(function() {                                                           // 16
        return Spacebars.call(view.lookup("dropdown"));                                                                // 17
      }, function() {                                                                                                  // 18
        return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];     // 19
      }, function() {                                                                                                  // 20
        return [ "\n          ", HTML.DIV({                                                                            // 21
          "class": "login-buttons-with-only-one-button"                                                                // 22
        }, "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n          "), "\n        " ];
      }), "\n      " ];                                                                                                // 24
    }, function() {                                                                                                    // 25
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n      " ];            // 26
    }), "\n    " ];                                                                                                    // 27
  }, function() {                                                                                                      // 28
    return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n    " ];                 // 29
  }), "\n  ");                                                                                                         // 30
}));                                                                                                                   // 31
                                                                                                                       // 32
Template.__checkName("_loginButtonsLoggedIn");                                                                         // 33
Template["_loginButtonsLoggedIn"] = new Template("Template._loginButtonsLoggedIn", (function() {                       // 34
  var view = this;                                                                                                     // 35
  return Blaze.If(function() {                                                                                         // 36
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 37
  }, function() {                                                                                                      // 38
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n  " ];              // 39
  }, function() {                                                                                                      // 40
    return [ "\n    ", HTML.DIV({                                                                                      // 41
      "class": "login-buttons-with-only-one-button"                                                                    // 42
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n    "), "\n  " ];
  });                                                                                                                  // 44
}));                                                                                                                   // 45
                                                                                                                       // 46
Template.__checkName("_loginButtonsLoggedOut");                                                                        // 47
Template["_loginButtonsLoggedOut"] = new Template("Template._loginButtonsLoggedOut", (function() {                     // 48
  var view = this;                                                                                                     // 49
  return Blaze.If(function() {                                                                                         // 50
    return Spacebars.call(view.lookup("services"));                                                                    // 51
  }, function() {                                                                                                      // 52
    return [ " \n    ", Blaze.If(function() {                                                                          // 53
      return Spacebars.call(view.lookup("configurationLoaded"));                                                       // 54
    }, function() {                                                                                                    // 55
      return [ "\n      ", Blaze.If(function() {                                                                       // 56
        return Spacebars.call(view.lookup("dropdown"));                                                                // 57
      }, function() {                                                                                                  // 58
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n      " ];
      }, function() {                                                                                                  // 60
        return [ "\n        ", Spacebars.With(function() {                                                             // 61
          return Spacebars.call(view.lookup("singleService"));                                                         // 62
        }, function() {                                                                                                // 63
          return [ " \n          ", HTML.DIV({                                                                         // 64
            "class": "login-buttons-with-only-one-button"                                                              // 65
          }, "\n            ", Blaze.If(function() {                                                                   // 66
            return Spacebars.call(view.lookup("loggingIn"));                                                           // 67
          }, function() {                                                                                              // 68
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n            " ];
          }, function() {                                                                                              // 70
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n            " ];
          }), "\n          "), "\n        " ];                                                                         // 72
        }), "\n      " ];                                                                                              // 73
      }), "\n    " ];                                                                                                  // 74
    }), "\n  " ];                                                                                                      // 75
  }, function() {                                                                                                      // 76
    return [ "\n    ", HTML.DIV({                                                                                      // 77
      "class": "no-services"                                                                                           // 78
    }, "No login services configured"), "\n  " ];                                                                      // 79
  });                                                                                                                  // 80
}));                                                                                                                   // 81
                                                                                                                       // 82
Template.__checkName("_loginButtonsMessages");                                                                         // 83
Template["_loginButtonsMessages"] = new Template("Template._loginButtonsMessages", (function() {                       // 84
  var view = this;                                                                                                     // 85
  return [ Blaze.If(function() {                                                                                       // 86
    return Spacebars.call(view.lookup("errorMessage"));                                                                // 87
  }, function() {                                                                                                      // 88
    return [ "\n    ", HTML.DIV({                                                                                      // 89
      "class": "message error-message"                                                                                 // 90
    }, Blaze.View(function() {                                                                                         // 91
      return Spacebars.mustache(view.lookup("errorMessage"));                                                          // 92
    })), "\n  " ];                                                                                                     // 93
  }), "\n  ", Blaze.If(function() {                                                                                    // 94
    return Spacebars.call(view.lookup("infoMessage"));                                                                 // 95
  }, function() {                                                                                                      // 96
    return [ "\n    ", HTML.DIV({                                                                                      // 97
      "class": "message info-message"                                                                                  // 98
    }, Blaze.View(function() {                                                                                         // 99
      return Spacebars.mustache(view.lookup("infoMessage"));                                                           // 100
    })), "\n  " ];                                                                                                     // 101
  }) ];                                                                                                                // 102
}));                                                                                                                   // 103
                                                                                                                       // 104
Template.__checkName("_loginButtonsLoggingIn");                                                                        // 105
Template["_loginButtonsLoggingIn"] = new Template("Template._loginButtonsLoggingIn", (function() {                     // 106
  var view = this;                                                                                                     // 107
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")), HTML.Raw('\n  <div class="loading">&nbsp;</div>\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")) ];
}));                                                                                                                   // 109
                                                                                                                       // 110
Template.__checkName("_loginButtonsLoggingInPadding");                                                                 // 111
Template["_loginButtonsLoggingInPadding"] = new Template("Template._loginButtonsLoggingInPadding", (function() {       // 112
  var view = this;                                                                                                     // 113
  return Blaze.Unless(function() {                                                                                     // 114
    return Spacebars.call(view.lookup("dropdown"));                                                                    // 115
  }, function() {                                                                                                      // 116
    return [ "\n    \n    ", HTML.DIV({                                                                                // 117
      "class": "login-buttons-padding"                                                                                 // 118
    }, "\n      ", HTML.DIV({                                                                                          // 119
      "class": "login-button single-login-button",                                                                     // 120
      style: "visibility: hidden;",                                                                                    // 121
      id: "login-buttons-logout"                                                                                       // 122
    }, HTML.CharRef({                                                                                                  // 123
      html: "&nbsp;",                                                                                                  // 124
      str: " "                                                                                                         // 125
    })), "\n    "), "\n  " ];                                                                                          // 126
  }, function() {                                                                                                      // 127
    return [ "\n    \n    ", HTML.DIV({                                                                                // 128
      "class": "login-buttons-padding"                                                                                 // 129
    }), "\n  " ];                                                                                                      // 130
  });                                                                                                                  // 131
}));                                                                                                                   // 132
                                                                                                                       // 133
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_single.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedOutSingleLoginButton");                                                       // 2
Template["_loginButtonsLoggedOutSingleLoginButton"] = new Template("Template._loginButtonsLoggedOutSingleLoginButton", (function() {
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "login-text-and-button"                                                                                   // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": function() {                                                                                              // 8
      return [ "login-button single-login-button ", Blaze.Unless(function() {                                          // 9
        return Spacebars.call(view.lookup("configured"));                                                              // 10
      }, function() {                                                                                                  // 11
        return "configure-button";                                                                                     // 12
      }) ];                                                                                                            // 13
    },                                                                                                                 // 14
    id: function() {                                                                                                   // 15
      return [ "login-buttons-", Spacebars.mustache(view.lookup("name")) ];                                            // 16
    }                                                                                                                  // 17
  }, "\n      ", HTML.DIV({                                                                                            // 18
    "class": "login-image",                                                                                            // 19
    id: function() {                                                                                                   // 20
      return [ "login-buttons-image-", Spacebars.mustache(view.lookup("name")) ];                                      // 21
    }                                                                                                                  // 22
  }), "\n      ", Blaze.If(function() {                                                                                // 23
    return Spacebars.call(view.lookup("configured"));                                                                  // 24
  }, function() {                                                                                                      // 25
    return [ "\n        ", HTML.SPAN({                                                                                 // 26
      "class": function() {                                                                                            // 27
        return [ "text-besides-image sign-in-text-", Spacebars.mustache(view.lookup("name")) ];                        // 28
      }                                                                                                                // 29
    }, "Sign in with ", Blaze.View(function() {                                                                        // 30
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 31
    })), "\n      " ];                                                                                                 // 32
  }, function() {                                                                                                      // 33
    return [ "\n        ", HTML.SPAN({                                                                                 // 34
      "class": function() {                                                                                            // 35
        return [ "text-besides-image configure-text-", Spacebars.mustache(view.lookup("name")) ];                      // 36
      }                                                                                                                // 37
    }, "Configure ", Blaze.View(function() {                                                                           // 38
      return Spacebars.mustache(view.lookup("capitalizedName"));                                                       // 39
    }), " Login"), "\n      " ];                                                                                       // 40
  }), "\n    "), "\n  ");                                                                                              // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
Template.__checkName("_loginButtonsLoggingInSingleLoginButton");                                                       // 44
Template["_loginButtonsLoggingInSingleLoginButton"] = new Template("Template._loginButtonsLoggingInSingleLoginButton", (function() {
  var view = this;                                                                                                     // 46
  return HTML.DIV({                                                                                                    // 47
    "class": "login-text-and-button"                                                                                   // 48
  }, "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n  ");                              // 49
}));                                                                                                                   // 50
                                                                                                                       // 51
Template.__checkName("_loginButtonsLoggedInSingleLogoutButton");                                                       // 52
Template["_loginButtonsLoggedInSingleLogoutButton"] = new Template("Template._loginButtonsLoggedInSingleLogoutButton", (function() {
  var view = this;                                                                                                     // 54
  return HTML.DIV({                                                                                                    // 55
    "class": "login-text-and-button"                                                                                   // 56
  }, "\n    ", HTML.DIV({                                                                                              // 57
    "class": "login-display-name"                                                                                      // 58
  }, "\n      ", Blaze.View(function() {                                                                               // 59
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 60
  }), "\n    "), HTML.Raw('\n    <div class="login-button single-login-button" id="login-buttons-logout">Sign Out</div>\n  '));
}));                                                                                                                   // 62
                                                                                                                       // 63
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dropdown.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("_loginButtonsLoggedInDropdown");                                                                 // 2
Template["_loginButtonsLoggedInDropdown"] = new Template("Template._loginButtonsLoggedInDropdown", (function() {       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "login-link-and-dropdown-list"                                                                            // 6
  }, "\n    ", HTML.A({                                                                                                // 7
    "class": "login-link-text",                                                                                        // 8
    id: "login-name-link"                                                                                              // 9
  }, "\n      ", Blaze.View(function() {                                                                               // 10
    return Spacebars.mustache(view.lookup("displayName"));                                                             // 11
  }), " ▾\n    "), "\n\n    ", Blaze.If(function() {                                                                   // 12
    return Spacebars.call(view.lookup("dropdownVisible"));                                                             // 13
  }, function() {                                                                                                      // 14
    return [ "\n      ", HTML.DIV({                                                                                    // 15
      id: "login-dropdown-list",                                                                                       // 16
      "class": "accounts-dialog"                                                                                       // 17
    }, "\n        ", HTML.A({                                                                                          // 18
      "class": "login-close-text"                                                                                      // 19
    }, "Close"), "\n        ", HTML.DIV({                                                                              // 20
      "class": "login-close-text-clear"                                                                                // 21
    }), "\n\n        ", Blaze.If(function() {                                                                          // 22
      return Spacebars.call(view.lookup("inMessageOnlyFlow"));                                                         // 23
    }, function() {                                                                                                    // 24
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n        " ];        // 25
    }, function() {                                                                                                    // 26
      return [ "\n          ", Blaze.If(function() {                                                                   // 27
        return Spacebars.call(view.lookup("inChangePasswordFlow"));                                                    // 28
      }, function() {                                                                                                  // 29
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n          " ];
      }, function() {                                                                                                  // 31
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n          " ];
      }), "\n        " ];                                                                                              // 33
    }), "\n      "), "\n    " ];                                                                                       // 34
  }), "\n  ");                                                                                                         // 35
}));                                                                                                                   // 36
                                                                                                                       // 37
Template.__checkName("_loginButtonsLoggedInDropdownActions");                                                          // 38
Template["_loginButtonsLoggedInDropdownActions"] = new Template("Template._loginButtonsLoggedInDropdownActions", (function() {
  var view = this;                                                                                                     // 40
  return [ Blaze.If(function() {                                                                                       // 41
    return Spacebars.call(view.lookup("allowChangingPassword"));                                                       // 42
  }, function() {                                                                                                      // 43
    return [ "\n    ", HTML.DIV({                                                                                      // 44
      "class": "login-button",                                                                                         // 45
      id: "login-buttons-open-change-password"                                                                         // 46
    }, "\n      Change password\n    "), "\n  " ];                                                                     // 47
  }), HTML.Raw('\n\n  <div class="login-button" id="login-buttons-logout">\n    Sign out\n  </div>\n\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")) ];
}));                                                                                                                   // 49
                                                                                                                       // 50
Template.__checkName("_loginButtonsLoggedOutDropdown");                                                                // 51
Template["_loginButtonsLoggedOutDropdown"] = new Template("Template._loginButtonsLoggedOutDropdown", (function() {     // 52
  var view = this;                                                                                                     // 53
  return HTML.DIV({                                                                                                    // 54
    "class": function() {                                                                                              // 55
      return [ "login-link-and-dropdown-list ", Spacebars.mustache(view.lookup("additionalClasses")) ];                // 56
    }                                                                                                                  // 57
  }, "\n    ", Blaze.If(function() {                                                                                   // 58
    return Spacebars.call(view.lookup("dropdownVisible"));                                                             // 59
  }, function() {                                                                                                      // 60
    return [ "\n      \n      ", HTML.A({                                                                              // 61
      "class": "login-link-text",                                                                                      // 62
      id: "login-sign-in-link"                                                                                         // 63
    }, "Sign in ▾"), "\n      ", HTML.DIV({                                                                            // 64
      id: "login-dropdown-list",                                                                                       // 65
      "class": "accounts-dialog"                                                                                       // 66
    }, "\n        ", HTML.A({                                                                                          // 67
      "class": "login-close-text"                                                                                      // 68
    }, "Close"), "\n        ", Blaze.If(function() {                                                                   // 69
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 70
    }, function() {                                                                                                    // 71
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];       // 72
    }), "\n        ", HTML.DIV({                                                                                       // 73
      "class": "login-close-text-clear"                                                                                // 74
    }), "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n      "), "\n    " ];
  }, function() {                                                                                                      // 76
    return [ "\n      ", Blaze.If(function() {                                                                         // 77
      return Spacebars.call(view.lookup("loggingIn"));                                                                 // 78
    }, function() {                                                                                                    // 79
      return [ "\n        \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n      " ]; // 80
    }, function() {                                                                                                    // 81
      return [ "\n        ", HTML.A({                                                                                  // 82
        "class": "login-link-text",                                                                                    // 83
        id: "login-sign-in-link"                                                                                       // 84
      }, "Sign in ▾"), "\n      " ];                                                                                   // 85
    }), "\n    " ];                                                                                                    // 86
  }), "\n  ");                                                                                                         // 87
}));                                                                                                                   // 88
                                                                                                                       // 89
Template.__checkName("_loginButtonsLoggedOutAllServices");                                                             // 90
Template["_loginButtonsLoggedOutAllServices"] = new Template("Template._loginButtonsLoggedOutAllServices", (function() {
  var view = this;                                                                                                     // 92
  return [ Blaze.Each(function() {                                                                                     // 93
    return Spacebars.call(view.lookup("services"));                                                                    // 94
  }, function() {                                                                                                      // 95
    return [ "\n    ", Blaze.If(function() {                                                                           // 96
      return Spacebars.call(view.lookup("isPasswordService"));                                                         // 97
    }, function() {                                                                                                    // 98
      return [ "\n      ", Blaze.If(function() {                                                                       // 99
        return Spacebars.call(view.lookup("hasOtherServices"));                                                        // 100
      }, function() {                                                                                                  // 101
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n      " ];
      }), "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n    " ];     // 103
    }, function() {                                                                                                    // 104
      return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n    " ];
    }), "\n  " ];                                                                                                      // 106
  }), "\n\n  ", Blaze.Unless(function() {                                                                              // 107
    return Spacebars.call(view.lookup("hasPasswordService"));                                                          // 108
  }, function() {                                                                                                      // 109
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n  " ];                      // 110
  }) ];                                                                                                                // 111
}));                                                                                                                   // 112
                                                                                                                       // 113
Template.__checkName("_loginButtonsLoggedOutPasswordServiceSeparator");                                                // 114
Template["_loginButtonsLoggedOutPasswordServiceSeparator"] = new Template("Template._loginButtonsLoggedOutPasswordServiceSeparator", (function() {
  var view = this;                                                                                                     // 116
  return HTML.Raw('<div class="or">\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n    <span class="or-text">or</span>\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n  </div>');
}));                                                                                                                   // 118
                                                                                                                       // 119
Template.__checkName("_loginButtonsLoggedOutPasswordService");                                                         // 120
Template["_loginButtonsLoggedOutPasswordService"] = new Template("Template._loginButtonsLoggedOutPasswordService", (function() {
  var view = this;                                                                                                     // 122
  return Blaze.If(function() {                                                                                         // 123
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));                                                        // 124
  }, function() {                                                                                                      // 125
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n  " ];                        // 126
  }, function() {                                                                                                      // 127
    return [ "\n    ", HTML.DIV({                                                                                      // 128
      "class": "login-form login-password-form"                                                                        // 129
    }, "\n      ", Blaze.Each(function() {                                                                             // 130
      return Spacebars.call(view.lookup("fields"));                                                                    // 131
    }, function() {                                                                                                    // 132
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n      " ];           // 133
    }), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({        // 134
      "class": "login-button login-button-form-submit",                                                                // 135
      id: "login-buttons-password"                                                                                     // 136
    }, "\n        ", Blaze.If(function() {                                                                             // 137
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 138
    }, function() {                                                                                                    // 139
      return "\n          Create account\n        ";                                                                   // 140
    }, function() {                                                                                                    // 141
      return "\n          Sign in\n        ";                                                                          // 142
    }), "\n      "), "\n\n      ", Blaze.If(function() {                                                               // 143
      return Spacebars.call(view.lookup("inLoginFlow"));                                                               // 144
    }, function() {                                                                                                    // 145
      return [ "\n        ", Blaze.If(function() {                                                                     // 146
        return Spacebars.call(view.lookup("showCreateAccountLink"));                                                   // 147
      }, function() {                                                                                                  // 148
        return [ "\n          ", HTML.DIV({                                                                            // 149
          "class": "additional-link-container"                                                                         // 150
        }, "\n            ", HTML.A({                                                                                  // 151
          id: "signup-link",                                                                                           // 152
          "class": "additional-link"                                                                                   // 153
        }, "Create account"), "\n          "), "\n        " ];                                                         // 154
      }), "\n\n        ", Blaze.If(function() {                                                                        // 155
        return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                  // 156
      }, function() {                                                                                                  // 157
        return [ "\n          ", HTML.DIV({                                                                            // 158
          "class": "additional-link-container"                                                                         // 159
        }, "\n            ", HTML.A({                                                                                  // 160
          id: "forgot-password-link",                                                                                  // 161
          "class": "additional-link"                                                                                   // 162
        }, "Forgot password"), "\n          "), "\n        " ];                                                        // 163
      }), "\n      " ];                                                                                                // 164
    }), "\n\n      ", Blaze.If(function() {                                                                            // 165
      return Spacebars.call(view.lookup("inSignupFlow"));                                                              // 166
    }, function() {                                                                                                    // 167
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n      " ];     // 168
    }), "\n    "), "\n  " ];                                                                                           // 169
  });                                                                                                                  // 170
}));                                                                                                                   // 171
                                                                                                                       // 172
Template.__checkName("_forgotPasswordForm");                                                                           // 173
Template["_forgotPasswordForm"] = new Template("Template._forgotPasswordForm", (function() {                           // 174
  var view = this;                                                                                                     // 175
  return HTML.DIV({                                                                                                    // 176
    "class": "login-form"                                                                                              // 177
  }, HTML.Raw('\n    <div id="forgot-password-email-label-and-input"> \n      <label id="forgot-password-email-label" for="forgot-password-email">Email</label>\n      <input id="forgot-password-email" type="email">\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n    <div class="login-button login-button-form-submit" id="login-buttons-forgot-password">\n      Reset password\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n  ");
}));                                                                                                                   // 179
                                                                                                                       // 180
Template.__checkName("_loginButtonsBackToLoginLink");                                                                  // 181
Template["_loginButtonsBackToLoginLink"] = new Template("Template._loginButtonsBackToLoginLink", (function() {         // 182
  var view = this;                                                                                                     // 183
  return HTML.Raw('<div class="additional-link-container">\n    <a id="back-to-login-link" class="additional-link">Sign in</a>\n  </div>');
}));                                                                                                                   // 185
                                                                                                                       // 186
Template.__checkName("_loginButtonsFormField");                                                                        // 187
Template["_loginButtonsFormField"] = new Template("Template._loginButtonsFormField", (function() {                     // 188
  var view = this;                                                                                                     // 189
  return Blaze.If(function() {                                                                                         // 190
    return Spacebars.call(view.lookup("visible"));                                                                     // 191
  }, function() {                                                                                                      // 192
    return [ "\n    ", HTML.DIV({                                                                                      // 193
      id: function() {                                                                                                 // 194
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label-and-input" ];                         // 195
      }                                                                                                                // 196
    }, "\n      ", HTML.LABEL({                                                                                        // 197
      id: function() {                                                                                                 // 198
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label" ];                                   // 199
      },                                                                                                               // 200
      "for": function() {                                                                                              // 201
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 202
      }                                                                                                                // 203
    }, "\n        ", Blaze.View(function() {                                                                           // 204
      return Spacebars.mustache(view.lookup("fieldLabel"));                                                            // 205
    }), "\n      "), "\n      ", HTML.INPUT({                                                                          // 206
      id: function() {                                                                                                 // 207
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];                                             // 208
      },                                                                                                               // 209
      type: function() {                                                                                               // 210
        return Spacebars.mustache(view.lookup("inputType"));                                                           // 211
      }                                                                                                                // 212
    }), "\n    "), "\n  " ];                                                                                           // 213
  });                                                                                                                  // 214
}));                                                                                                                   // 215
                                                                                                                       // 216
Template.__checkName("_loginButtonsChangePassword");                                                                   // 217
Template["_loginButtonsChangePassword"] = new Template("Template._loginButtonsChangePassword", (function() {           // 218
  var view = this;                                                                                                     // 219
  return [ Blaze.Each(function() {                                                                                     // 220
    return Spacebars.call(view.lookup("fields"));                                                                      // 221
  }, function() {                                                                                                      // 222
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n  " ];                     // 223
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n  <div class="login-button login-button-form-submit" id="login-buttons-do-change-password">\n    Change password\n  </div>') ];
}));                                                                                                                   // 225
                                                                                                                       // 226
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dialogs.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justResetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginOnDesktopDialog")), HTML.Raw("\n\n  <!-- if we're not showing a dropdown, we need some other place to show messages -->\n  "), Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
Template.__checkName("_resetPasswordDialog");                                                                          // 8
Template["_resetPasswordDialog"] = new Template("Template._resetPasswordDialog", (function() {                         // 9
  var view = this;                                                                                                     // 10
  return Blaze.If(function() {                                                                                         // 11
    return Spacebars.call(view.lookup("inResetPasswordFlow"));                                                         // 12
  }, function() {                                                                                                      // 13
    return [ "\n    ", HTML.DIV({                                                                                      // 14
      "class": "hide-background"                                                                                       // 15
    }), "\n\n    ", HTML.DIV({                                                                                         // 16
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 17
    }, "\n      ", HTML.LABEL({                                                                                        // 18
      id: "reset-password-new-password-label",                                                                         // 19
      "for": "reset-password-new-password"                                                                             // 20
    }, "\n        New password\n      "), "\n\n      ", HTML.DIV({                                                     // 21
      "class": "reset-password-new-password-wrapper"                                                                   // 22
    }, "\n        ", HTML.INPUT({                                                                                      // 23
      id: "reset-password-new-password",                                                                               // 24
      type: "password"                                                                                                 // 25
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      "class": "login-button login-button-form-submit",                                                                // 27
      id: "login-buttons-reset-password-button"                                                                        // 28
    }, "\n        Set password\n      "), "\n\n      ", HTML.A({                                                       // 29
      "class": "accounts-close",                                                                                       // 30
      id: "login-buttons-cancel-reset-password"                                                                        // 31
    }, HTML.CharRef({                                                                                                  // 32
      html: "&times;",                                                                                                 // 33
      str: "×"                                                                                                         // 34
    })), "\n    "), "\n  " ];                                                                                          // 35
  });                                                                                                                  // 36
}));                                                                                                                   // 37
                                                                                                                       // 38
Template.__checkName("_justResetPasswordDialog");                                                                      // 39
Template["_justResetPasswordDialog"] = new Template("Template._justResetPasswordDialog", (function() {                 // 40
  var view = this;                                                                                                     // 41
  return Blaze.If(function() {                                                                                         // 42
    return Spacebars.call(view.lookup("visible"));                                                                     // 43
  }, function() {                                                                                                      // 44
    return [ "\n    ", HTML.DIV({                                                                                      // 45
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 46
    }, "\n      Password reset.\n      You are now logged in as ", Blaze.View(function() {                             // 47
      return Spacebars.mustache(view.lookup("displayName"));                                                           // 48
    }), ".\n      ", HTML.DIV({                                                                                        // 49
      "class": "login-button",                                                                                         // 50
      id: "just-verified-dismiss-button"                                                                               // 51
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 52
  });                                                                                                                  // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
Template.__checkName("_enrollAccountDialog");                                                                          // 56
Template["_enrollAccountDialog"] = new Template("Template._enrollAccountDialog", (function() {                         // 57
  var view = this;                                                                                                     // 58
  return Blaze.If(function() {                                                                                         // 59
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));                                                         // 60
  }, function() {                                                                                                      // 61
    return [ "\n    ", HTML.DIV({                                                                                      // 62
      "class": "hide-background"                                                                                       // 63
    }), "\n\n    ", HTML.DIV({                                                                                         // 64
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 65
    }, "\n      ", HTML.LABEL({                                                                                        // 66
      id: "enroll-account-password-label",                                                                             // 67
      "for": "enroll-account-password"                                                                                 // 68
    }, "\n        Choose a password\n      "), "\n\n      ", HTML.DIV({                                                // 69
      "class": "enroll-account-password-wrapper"                                                                       // 70
    }, "\n        ", HTML.INPUT({                                                                                      // 71
      id: "enroll-account-password",                                                                                   // 72
      type: "password"                                                                                                 // 73
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      "class": "login-button login-button-form-submit",                                                                // 75
      id: "login-buttons-enroll-account-button"                                                                        // 76
    }, "\n        Create account\n      "), "\n\n      ", HTML.A({                                                     // 77
      "class": "accounts-close",                                                                                       // 78
      id: "login-buttons-cancel-enroll-account"                                                                        // 79
    }, HTML.CharRef({                                                                                                  // 80
      html: "&times;",                                                                                                 // 81
      str: "×"                                                                                                         // 82
    })), "\n    "), "\n  " ];                                                                                          // 83
  });                                                                                                                  // 84
}));                                                                                                                   // 85
                                                                                                                       // 86
Template.__checkName("_justVerifiedEmailDialog");                                                                      // 87
Template["_justVerifiedEmailDialog"] = new Template("Template._justVerifiedEmailDialog", (function() {                 // 88
  var view = this;                                                                                                     // 89
  return Blaze.If(function() {                                                                                         // 90
    return Spacebars.call(view.lookup("visible"));                                                                     // 91
  }, function() {                                                                                                      // 92
    return [ "\n    ", HTML.DIV({                                                                                      // 93
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 94
    }, "\n      Email verified.\n      You are now logged in as ", Blaze.View(function() {                             // 95
      return Spacebars.mustache(view.lookup("displayName"));                                                           // 96
    }), ".\n      ", HTML.DIV({                                                                                        // 97
      "class": "login-button",                                                                                         // 98
      id: "just-verified-dismiss-button"                                                                               // 99
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 100
  });                                                                                                                  // 101
}));                                                                                                                   // 102
                                                                                                                       // 103
Template.__checkName("_configureLoginServiceDialog");                                                                  // 104
Template["_configureLoginServiceDialog"] = new Template("Template._configureLoginServiceDialog", (function() {         // 105
  var view = this;                                                                                                     // 106
  return Blaze.If(function() {                                                                                         // 107
    return Spacebars.call(view.lookup("visible"));                                                                     // 108
  }, function() {                                                                                                      // 109
    return [ "\n    ", HTML.DIV({                                                                                      // 110
      id: "configure-login-service-dialog",                                                                            // 111
      "class": "accounts-dialog accounts-centered-dialog"                                                              // 112
    }, "\n      ", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n\n      ", HTML.P("\n        Now, copy over some details.\n      "), "\n      ", HTML.P("\n        ", HTML.TABLE("\n          ", HTML.COLGROUP("\n            ", HTML.COL({
      span: "1",                                                                                                       // 114
      "class": "configuration_labels"                                                                                  // 115
    }), "\n            ", HTML.COL({                                                                                   // 116
      span: "1",                                                                                                       // 117
      "class": "configuration_inputs"                                                                                  // 118
    }), "\n          "), "\n          ", Blaze.Each(function() {                                                       // 119
      return Spacebars.call(view.lookup("configurationFields"));                                                       // 120
    }, function() {                                                                                                    // 121
      return [ "\n            ", HTML.TR("\n              ", HTML.TD("\n                ", HTML.LABEL({                // 122
        "for": function() {                                                                                            // 123
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 124
        }                                                                                                              // 125
      }, Blaze.View(function() {                                                                                       // 126
        return Spacebars.mustache(view.lookup("label"));                                                               // 127
      })), "\n              "), "\n              ", HTML.TD("\n                ", HTML.INPUT({                         // 128
        id: function() {                                                                                               // 129
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];                   // 130
        },                                                                                                             // 131
        type: "text"                                                                                                   // 132
      }), "\n              "), "\n            "), "\n          " ];                                                    // 133
    }), "\n        "), "\n      "), "\n      ", HTML.P({                                                               // 134
      "class": "new-section"                                                                                           // 135
    }, "\n        Choose the login style:\n      "), "\n      ", HTML.P("\n        ", HTML.CharRef({                   // 136
      html: "&emsp;",                                                                                                  // 137
      str: " "                                                                                                         // 138
    }), HTML.INPUT({                                                                                                   // 139
      id: "configure-login-service-dialog-popupBasedLogin",                                                            // 140
      type: "radio",                                                                                                   // 141
      checked: "checked",                                                                                              // 142
      name: "loginStyle",                                                                                              // 143
      value: "popup"                                                                                                   // 144
    }), "\n        ", HTML.LABEL({                                                                                     // 145
      "for": "configure-login-service-dialog-popupBasedLogin"                                                          // 146
    }, "Popup-based login (recommended for most applications)"), "\n\n        ", HTML.BR(), HTML.CharRef({             // 147
      html: "&emsp;",                                                                                                  // 148
      str: " "                                                                                                         // 149
    }), HTML.INPUT({                                                                                                   // 150
      id: "configure-login-service-dialog-redirectBasedLogin",                                                         // 151
      type: "radio",                                                                                                   // 152
      name: "loginStyle",                                                                                              // 153
      value: "redirect"                                                                                                // 154
    }), "\n        ", HTML.LABEL({                                                                                     // 155
      "for": "configure-login-service-dialog-redirectBasedLogin"                                                       // 156
    }, "\n          Redirect-based login (special cases explained\n          ", HTML.A({                               // 157
      href: "https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients#popup-versus-redirect-flow",        // 158
      target: "_blank"                                                                                                 // 159
    }, "here"), ")\n        "), "\n      "), "\n      ", HTML.DIV({                                                    // 160
      "class": "new-section"                                                                                           // 161
    }, "\n        ", HTML.DIV({                                                                                        // 162
      "class": "login-button configure-login-service-dismiss-button"                                                   // 163
    }, "\n          I'll do this later\n        "), "\n        ", HTML.A({                                             // 164
      "class": "accounts-close configure-login-service-dismiss-button"                                                 // 165
    }, HTML.CharRef({                                                                                                  // 166
      html: "&times;",                                                                                                 // 167
      str: "×"                                                                                                         // 168
    })), "\n\n        ", HTML.DIV({                                                                                    // 169
      "class": function() {                                                                                            // 170
        return [ "login-button login-button-configure ", Blaze.If(function() {                                         // 171
          return Spacebars.call(view.lookup("saveDisabled"));                                                          // 172
        }, function() {                                                                                                // 173
          return "login-button-disabled";                                                                              // 174
        }) ];                                                                                                          // 175
      },                                                                                                               // 176
      id: "configure-login-service-dialog-save-configuration"                                                          // 177
    }, "\n          Save Configuration\n        "), "\n      "), "\n    "), "\n  " ];                                  // 178
  });                                                                                                                  // 179
}));                                                                                                                   // 180
                                                                                                                       // 181
Template.__checkName("_loginButtonsMessagesDialog");                                                                   // 182
Template["_loginButtonsMessagesDialog"] = new Template("Template._loginButtonsMessagesDialog", (function() {           // 183
  var view = this;                                                                                                     // 184
  return Blaze.If(function() {                                                                                         // 185
    return Spacebars.call(view.lookup("visible"));                                                                     // 186
  }, function() {                                                                                                      // 187
    return [ "\n    ", HTML.DIV({                                                                                      // 188
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 189
      id: "login-buttons-message-dialog"                                                                               // 190
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({             // 191
      "class": "login-button",                                                                                         // 192
      id: "messages-dialog-dismiss-button"                                                                             // 193
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 194
  });                                                                                                                  // 195
}));                                                                                                                   // 196
                                                                                                                       // 197
Template.__checkName("_configureLoginOnDesktopDialog");                                                                // 198
Template["_configureLoginOnDesktopDialog"] = new Template("Template._configureLoginOnDesktopDialog", (function() {     // 199
  var view = this;                                                                                                     // 200
  return Blaze.If(function() {                                                                                         // 201
    return Spacebars.call(view.lookup("visible"));                                                                     // 202
  }, function() {                                                                                                      // 203
    return [ "\n    ", HTML.DIV({                                                                                      // 204
      "class": "accounts-dialog accounts-centered-dialog",                                                             // 205
      id: "configure-on-desktop-dialog"                                                                                // 206
    }, "\n      ", HTML.P("\n        Please configure login on a desktop browser.\n      "), "\n      ", HTML.DIV({    // 207
      "class": "login-button",                                                                                         // 208
      id: "configure-on-desktop-dismiss-button"                                                                        // 209
    }, "Dismiss"), "\n    "), "\n  " ];                                                                                // 210
  });                                                                                                                  // 211
}));                                                                                                                   // 212
                                                                                                                       // 213
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_session.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var VALID_KEYS = [                                                                                                     // 1
  'dropdownVisible',                                                                                                   // 2
                                                                                                                       // 3
  // XXX consider replacing these with one key that has an enum for values.                                            // 4
  'inSignupFlow',                                                                                                      // 5
  'inForgotPasswordFlow',                                                                                              // 6
  'inChangePasswordFlow',                                                                                              // 7
  'inMessageOnlyFlow',                                                                                                 // 8
                                                                                                                       // 9
  'errorMessage',                                                                                                      // 10
  'infoMessage',                                                                                                       // 11
                                                                                                                       // 12
  // dialogs with messages (info and error)                                                                            // 13
  'resetPasswordToken',                                                                                                // 14
  'enrollAccountToken',                                                                                                // 15
  'justVerifiedEmail',                                                                                                 // 16
  'justResetPassword',                                                                                                 // 17
                                                                                                                       // 18
  'configureLoginServiceDialogVisible',                                                                                // 19
  'configureLoginServiceDialogServiceName',                                                                            // 20
  'configureLoginServiceDialogSaveDisabled',                                                                           // 21
  'configureOnDesktopVisible'                                                                                          // 22
];                                                                                                                     // 23
                                                                                                                       // 24
var validateKey = function (key) {                                                                                     // 25
  if (!_.contains(VALID_KEYS, key))                                                                                    // 26
    throw new Error("Invalid key in loginButtonsSession: " + key);                                                     // 27
};                                                                                                                     // 28
                                                                                                                       // 29
var KEY_PREFIX = "Meteor.loginButtons.";                                                                               // 30
                                                                                                                       // 31
// XXX This should probably be package scope rather than exported                                                      // 32
// (there was even a comment to that effect here from before we had                                                    // 33
// namespacing) but accounts-ui-viewer uses it, so leave it as is for                                                  // 34
// now                                                                                                                 // 35
Accounts._loginButtonsSession = {                                                                                      // 36
  set: function(key, value) {                                                                                          // 37
    validateKey(key);                                                                                                  // 38
    if (_.contains(['errorMessage', 'infoMessage'], key))                                                              // 39
      throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");
                                                                                                                       // 41
    this._set(key, value);                                                                                             // 42
  },                                                                                                                   // 43
                                                                                                                       // 44
  _set: function(key, value) {                                                                                         // 45
    Session.set(KEY_PREFIX + key, value);                                                                              // 46
  },                                                                                                                   // 47
                                                                                                                       // 48
  get: function(key) {                                                                                                 // 49
    validateKey(key);                                                                                                  // 50
    return Session.get(KEY_PREFIX + key);                                                                              // 51
  },                                                                                                                   // 52
                                                                                                                       // 53
  closeDropdown: function () {                                                                                         // 54
    this.set('inSignupFlow', false);                                                                                   // 55
    this.set('inForgotPasswordFlow', false);                                                                           // 56
    this.set('inChangePasswordFlow', false);                                                                           // 57
    this.set('inMessageOnlyFlow', false);                                                                              // 58
    this.set('dropdownVisible', false);                                                                                // 59
    this.resetMessages();                                                                                              // 60
  },                                                                                                                   // 61
                                                                                                                       // 62
  infoMessage: function(message) {                                                                                     // 63
    this._set("errorMessage", null);                                                                                   // 64
    this._set("infoMessage", message);                                                                                 // 65
    this.ensureMessageVisible();                                                                                       // 66
  },                                                                                                                   // 67
                                                                                                                       // 68
  errorMessage: function(message) {                                                                                    // 69
    this._set("errorMessage", message);                                                                                // 70
    this._set("infoMessage", null);                                                                                    // 71
    this.ensureMessageVisible();                                                                                       // 72
  },                                                                                                                   // 73
                                                                                                                       // 74
  // is there a visible dialog that shows messages (info and error)                                                    // 75
  isMessageDialogVisible: function () {                                                                                // 76
    return this.get('resetPasswordToken') ||                                                                           // 77
      this.get('enrollAccountToken') ||                                                                                // 78
      this.get('justVerifiedEmail');                                                                                   // 79
  },                                                                                                                   // 80
                                                                                                                       // 81
  // ensure that somethings displaying a message (info or error) is                                                    // 82
  // visible.  if a dialog with messages is open, do nothing;                                                          // 83
  // otherwise open the dropdown.                                                                                      // 84
  //                                                                                                                   // 85
  // notably this doesn't matter when only displaying a single login                                                   // 86
  // button since then we have an explicit message dialog                                                              // 87
  // (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                   // 88
  // this case.                                                                                                        // 89
  ensureMessageVisible: function () {                                                                                  // 90
    if (!this.isMessageDialogVisible())                                                                                // 91
      this.set("dropdownVisible", true);                                                                               // 92
  },                                                                                                                   // 93
                                                                                                                       // 94
  resetMessages: function () {                                                                                         // 95
    this._set("errorMessage", null);                                                                                   // 96
    this._set("infoMessage", null);                                                                                    // 97
  },                                                                                                                   // 98
                                                                                                                       // 99
  configureService: function (name) {                                                                                  // 100
    if (Meteor.isCordova) {                                                                                            // 101
      this.set('configureOnDesktopVisible', true);                                                                     // 102
    } else {                                                                                                           // 103
      this.set('configureLoginServiceDialogVisible', true);                                                            // 104
      this.set('configureLoginServiceDialogServiceName', name);                                                        // 105
      this.set('configureLoginServiceDialogSaveDisabled', true);                                                       // 106
    }                                                                                                                  // 107
  }                                                                                                                    // 108
};                                                                                                                     // 109
                                                                                                                       // 110
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// shared between dropdown and single mode                                                                             // 4
Template.loginButtons.events({                                                                                         // 5
  'click #login-buttons-logout': function() {                                                                          // 6
    Meteor.logout(function () {                                                                                        // 7
      loginButtonsSession.closeDropdown();                                                                             // 8
    });                                                                                                                // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
                                                                                                                       // 12
Template.registerHelper('loginButtons', function () {                                                                  // 13
  throw new Error("Use {{> loginButtons}} instead of {{loginButtons}}");                                               // 14
});                                                                                                                    // 15
                                                                                                                       // 16
//                                                                                                                     // 17
// helpers                                                                                                             // 18
//                                                                                                                     // 19
                                                                                                                       // 20
displayName = function () {                                                                                            // 21
  var user = Meteor.user();                                                                                            // 22
  if (!user)                                                                                                           // 23
    return '';                                                                                                         // 24
                                                                                                                       // 25
  if (user.profile && user.profile.name)                                                                               // 26
    return user.profile.name;                                                                                          // 27
  if (user.username)                                                                                                   // 28
    return user.username;                                                                                              // 29
  if (user.emails && user.emails[0] && user.emails[0].address)                                                         // 30
    return user.emails[0].address;                                                                                     // 31
                                                                                                                       // 32
  return '';                                                                                                           // 33
};                                                                                                                     // 34
                                                                                                                       // 35
// returns an array of the login services used by this app. each                                                       // 36
// element of the array is an object (eg {name: 'facebook'}), since                                                    // 37
// that makes it useful in combination with handlebars {{#each}}.                                                      // 38
//                                                                                                                     // 39
// don't cache the output of this function: if called during startup (before                                           // 40
// oauth packages load) it might not include them all.                                                                 // 41
//                                                                                                                     // 42
// NOTE: It is very important to have this return password last                                                        // 43
// because of the way we render the different providers in                                                             // 44
// login_buttons_dropdown.html                                                                                         // 45
getLoginServices = function () {                                                                                       // 46
  var self = this;                                                                                                     // 47
                                                                                                                       // 48
  // First look for OAuth services.                                                                                    // 49
  var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                       // 50
                                                                                                                       // 51
  // Be equally kind to all login services. This also preserves                                                        // 52
  // backwards-compatibility. (But maybe order should be                                                               // 53
  // configurable?)                                                                                                    // 54
  services.sort();                                                                                                     // 55
                                                                                                                       // 56
  // Add password, if it's there; it must come last.                                                                   // 57
  if (hasPasswordService())                                                                                            // 58
    services.push('password');                                                                                         // 59
                                                                                                                       // 60
  return _.map(services, function(name) {                                                                              // 61
    return {name: name};                                                                                               // 62
  });                                                                                                                  // 63
};                                                                                                                     // 64
                                                                                                                       // 65
hasPasswordService = function () {                                                                                     // 66
  return !!Package['accounts-password'];                                                                               // 67
};                                                                                                                     // 68
                                                                                                                       // 69
dropdown = function () {                                                                                               // 70
  return hasPasswordService() || getLoginServices().length > 1;                                                        // 71
};                                                                                                                     // 72
                                                                                                                       // 73
// XXX improve these. should this be in accounts-password instead?                                                     // 74
//                                                                                                                     // 75
// XXX these will become configurable, and will be validated on                                                        // 76
// the server as well.                                                                                                 // 77
validateUsername = function (username) {                                                                               // 78
  if (username.length >= 3) {                                                                                          // 79
    return true;                                                                                                       // 80
  } else {                                                                                                             // 81
    loginButtonsSession.errorMessage("Username must be at least 3 characters long");                                   // 82
    return false;                                                                                                      // 83
  }                                                                                                                    // 84
};                                                                                                                     // 85
validateEmail = function (email) {                                                                                     // 86
  if (passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')                                        // 87
    return true;                                                                                                       // 88
                                                                                                                       // 89
  if (email.indexOf('@') !== -1) {                                                                                     // 90
    return true;                                                                                                       // 91
  } else {                                                                                                             // 92
    loginButtonsSession.errorMessage("Invalid email");                                                                 // 93
    return false;                                                                                                      // 94
  }                                                                                                                    // 95
};                                                                                                                     // 96
validatePassword = function (password) {                                                                               // 97
  if (password.length >= 6) {                                                                                          // 98
    return true;                                                                                                       // 99
  } else {                                                                                                             // 100
    loginButtonsSession.errorMessage("Password must be at least 6 characters long");                                   // 101
    return false;                                                                                                      // 102
  }                                                                                                                    // 103
};                                                                                                                     // 104
                                                                                                                       // 105
//                                                                                                                     // 106
// loginButtonLoggedOut template                                                                                       // 107
//                                                                                                                     // 108
                                                                                                                       // 109
Template._loginButtonsLoggedOut.helpers({                                                                              // 110
  dropdown: dropdown,                                                                                                  // 111
  services: getLoginServices,                                                                                          // 112
  singleService: function () {                                                                                         // 113
    var services = getLoginServices();                                                                                 // 114
    if (services.length !== 1)                                                                                         // 115
      throw new Error(                                                                                                 // 116
        "Shouldn't be rendering this template with more than one configured service");                                 // 117
    return services[0];                                                                                                // 118
  },                                                                                                                   // 119
  configurationLoaded: function () {                                                                                   // 120
    return Accounts.loginServicesConfigured();                                                                         // 121
  }                                                                                                                    // 122
});                                                                                                                    // 123
                                                                                                                       // 124
                                                                                                                       // 125
//                                                                                                                     // 126
// loginButtonsLoggedIn template                                                                                       // 127
//                                                                                                                     // 128
                                                                                                                       // 129
  // decide whether we should show a dropdown rather than a row of                                                     // 130
  // buttons                                                                                                           // 131
Template._loginButtonsLoggedIn.helpers({                                                                               // 132
  dropdown: dropdown                                                                                                   // 133
});                                                                                                                    // 134
                                                                                                                       // 135
                                                                                                                       // 136
                                                                                                                       // 137
//                                                                                                                     // 138
// loginButtonsLoggedInSingleLogoutButton template                                                                     // 139
//                                                                                                                     // 140
                                                                                                                       // 141
Template._loginButtonsLoggedInSingleLogoutButton.helpers({                                                             // 142
  displayName: displayName                                                                                             // 143
});                                                                                                                    // 144
                                                                                                                       // 145
                                                                                                                       // 146
                                                                                                                       // 147
//                                                                                                                     // 148
// loginButtonsMessage template                                                                                        // 149
//                                                                                                                     // 150
                                                                                                                       // 151
Template._loginButtonsMessages.helpers({                                                                               // 152
  errorMessage: function () {                                                                                          // 153
    return loginButtonsSession.get('errorMessage');                                                                    // 154
  }                                                                                                                    // 155
});                                                                                                                    // 156
                                                                                                                       // 157
Template._loginButtonsMessages.helpers({                                                                               // 158
  infoMessage: function () {                                                                                           // 159
    return loginButtonsSession.get('infoMessage');                                                                     // 160
  }                                                                                                                    // 161
});                                                                                                                    // 162
                                                                                                                       // 163
                                                                                                                       // 164
//                                                                                                                     // 165
// loginButtonsLoggingInPadding template                                                                               // 166
//                                                                                                                     // 167
                                                                                                                       // 168
Template._loginButtonsLoggingInPadding.helpers({                                                                       // 169
  dropdown: dropdown                                                                                                   // 170
});                                                                                                                    // 171
                                                                                                                       // 172
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_single.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
                                                                                                                       // 4
var loginResultCallback = function (serviceName, err) {                                                                // 5
  if (!err) {                                                                                                          // 6
    loginButtonsSession.closeDropdown();                                                                               // 7
  } else if (err instanceof Accounts.LoginCancelledError) {                                                            // 8
    // do nothing                                                                                                      // 9
  } else if (err instanceof ServiceConfiguration.ConfigError) {                                                        // 10
    loginButtonsSession.configureService(serviceName);                                                                 // 11
  } else {                                                                                                             // 12
    loginButtonsSession.errorMessage(err.reason || "Unknown error");                                                   // 13
  }                                                                                                                    // 14
};                                                                                                                     // 15
                                                                                                                       // 16
                                                                                                                       // 17
// In the login redirect flow, we'll have the result of the login                                                      // 18
// attempt at page load time when we're redirected back to the                                                         // 19
// application.  Register a callback to update the UI (i.e. to close                                                   // 20
// the dialog on a successful login or display the error on a failed                                                   // 21
// login).                                                                                                             // 22
//                                                                                                                     // 23
Accounts.onPageLoadLogin(function (attemptInfo) {                                                                      // 24
  // Ignore if we have a left over login attempt for a service that is no longer registered.                           // 25
  if (_.contains(_.pluck(getLoginServices(), "name"), attemptInfo.type))                                               // 26
    loginResultCallback(attemptInfo.type, attemptInfo.error);                                                          // 27
});                                                                                                                    // 28
                                                                                                                       // 29
                                                                                                                       // 30
Template._loginButtonsLoggedOutSingleLoginButton.events({                                                              // 31
  'click .login-button': function () {                                                                                 // 32
    var serviceName = this.name;                                                                                       // 33
    loginButtonsSession.resetMessages();                                                                               // 34
                                                                                                                       // 35
    // XXX Service providers should be able to specify their                                                           // 36
    // `Meteor.loginWithX` method name.                                                                                // 37
    var loginWithService = Meteor["loginWith" +                                                                        // 38
                                  (serviceName === 'meteor-developer' ?                                                // 39
                                   'MeteorDeveloperAccount' :                                                          // 40
                                   capitalize(serviceName))];                                                          // 41
                                                                                                                       // 42
    var options = {}; // use default scope unless specified                                                            // 43
    if (Accounts.ui._options.requestPermissions[serviceName])                                                          // 44
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                               // 45
    if (Accounts.ui._options.requestOfflineToken[serviceName])                                                         // 46
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];                             // 47
    if (Accounts.ui._options.forceApprovalPrompt[serviceName])                                                         // 48
      options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];                             // 49
                                                                                                                       // 50
    loginWithService(options, function (err) {                                                                         // 51
      loginResultCallback(serviceName, err);                                                                           // 52
    });                                                                                                                // 53
  }                                                                                                                    // 54
});                                                                                                                    // 55
                                                                                                                       // 56
Template._loginButtonsLoggedOutSingleLoginButton.helpers({                                                             // 57
  configured: function () {                                                                                            // 58
    return !!ServiceConfiguration.configurations.findOne({service: this.name});                                        // 59
  },                                                                                                                   // 60
  capitalizedName: function () {                                                                                       // 61
    if (this.name === 'github')                                                                                        // 62
      // XXX we should allow service packages to set their capitalized name                                            // 63
      return 'GitHub';                                                                                                 // 64
    else if (this.name === 'meteor-developer')                                                                         // 65
      return 'Meteor';                                                                                                 // 66
    else                                                                                                               // 67
      return capitalize(this.name);                                                                                    // 68
  }                                                                                                                    // 69
});                                                                                                                    // 70
                                                                                                                       // 71
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                         // 72
var capitalize = function(str){                                                                                        // 73
  str = str == null ? '' : String(str);                                                                                // 74
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 75
};                                                                                                                     // 76
                                                                                                                       // 77
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dropdown.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// events shared between loginButtonsLoggedOutDropdown and                                                             // 4
// loginButtonsLoggedInDropdown                                                                                        // 5
Template.loginButtons.events({                                                                                         // 6
  'click #login-name-link, click #login-sign-in-link': function () {                                                   // 7
    loginButtonsSession.set('dropdownVisible', true);                                                                  // 8
    Tracker.flush();                                                                                                   // 9
    correctDropdownZIndexes();                                                                                         // 10
  },                                                                                                                   // 11
  'click .login-close-text': function () {                                                                             // 12
    loginButtonsSession.closeDropdown();                                                                               // 13
  }                                                                                                                    // 14
});                                                                                                                    // 15
                                                                                                                       // 16
                                                                                                                       // 17
//                                                                                                                     // 18
// loginButtonsLoggedInDropdown template and related                                                                   // 19
//                                                                                                                     // 20
                                                                                                                       // 21
Template._loginButtonsLoggedInDropdown.events({                                                                        // 22
  'click #login-buttons-open-change-password': function() {                                                            // 23
    loginButtonsSession.resetMessages();                                                                               // 24
    loginButtonsSession.set('inChangePasswordFlow', true);                                                             // 25
  }                                                                                                                    // 26
});                                                                                                                    // 27
                                                                                                                       // 28
Template._loginButtonsLoggedInDropdown.helpers({                                                                       // 29
  displayName: displayName,                                                                                            // 30
                                                                                                                       // 31
  inChangePasswordFlow: function () {                                                                                  // 32
    return loginButtonsSession.get('inChangePasswordFlow');                                                            // 33
  },                                                                                                                   // 34
                                                                                                                       // 35
  inMessageOnlyFlow: function () {                                                                                     // 36
    return loginButtonsSession.get('inMessageOnlyFlow');                                                               // 37
  },                                                                                                                   // 38
                                                                                                                       // 39
  dropdownVisible: function () {                                                                                       // 40
    return loginButtonsSession.get('dropdownVisible');                                                                 // 41
  }                                                                                                                    // 42
});                                                                                                                    // 43
                                                                                                                       // 44
Template._loginButtonsLoggedInDropdownActions.helpers({                                                                // 45
  allowChangingPassword: function () {                                                                                 // 46
    // it would be more correct to check whether the user has a password set,                                          // 47
    // but in order to do that we'd have to send more data down to the client,                                         // 48
    // and it'd be preferable not to send down the entire service.password document.                                   // 49
    //                                                                                                                 // 50
    // instead we use the heuristic: if the user has a username or email set.                                          // 51
    var user = Meteor.user();                                                                                          // 52
    return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                 // 53
  }                                                                                                                    // 54
});                                                                                                                    // 55
                                                                                                                       // 56
                                                                                                                       // 57
//                                                                                                                     // 58
// loginButtonsLoggedOutDropdown template and related                                                                  // 59
//                                                                                                                     // 60
                                                                                                                       // 61
Template._loginButtonsLoggedOutDropdown.events({                                                                       // 62
  'click #login-buttons-password': function () {                                                                       // 63
    loginOrSignup();                                                                                                   // 64
  },                                                                                                                   // 65
                                                                                                                       // 66
  'keypress #forgot-password-email': function (event) {                                                                // 67
    if (event.keyCode === 13)                                                                                          // 68
      forgotPassword();                                                                                                // 69
  },                                                                                                                   // 70
                                                                                                                       // 71
  'click #login-buttons-forgot-password': function () {                                                                // 72
    forgotPassword();                                                                                                  // 73
  },                                                                                                                   // 74
                                                                                                                       // 75
  'click #signup-link': function () {                                                                                  // 76
    loginButtonsSession.resetMessages();                                                                               // 77
                                                                                                                       // 78
    // store values of fields before swtiching to the signup form                                                      // 79
    var username = trimmedElementValueById('login-username');                                                          // 80
    var email = trimmedElementValueById('login-email');                                                                // 81
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                          // 82
    // notably not trimmed. a password could (?) start or end with a space                                             // 83
    var password = elementValueById('login-password');                                                                 // 84
                                                                                                                       // 85
    loginButtonsSession.set('inSignupFlow', true);                                                                     // 86
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                            // 87
    // force the ui to update so that we have the approprate fields to fill in                                         // 88
    Tracker.flush();                                                                                                   // 89
                                                                                                                       // 90
    // update new fields with appropriate defaults                                                                     // 91
    if (username !== null)                                                                                             // 92
      document.getElementById('login-username').value = username;                                                      // 93
    else if (email !== null)                                                                                           // 94
      document.getElementById('login-email').value = email;                                                            // 95
    else if (usernameOrEmail !== null)                                                                                 // 96
      if (usernameOrEmail.indexOf('@') === -1)                                                                         // 97
        document.getElementById('login-username').value = usernameOrEmail;                                             // 98
    else                                                                                                               // 99
      document.getElementById('login-email').value = usernameOrEmail;                                                  // 100
                                                                                                                       // 101
    if (password !== null)                                                                                             // 102
      document.getElementById('login-password').value = password;                                                      // 103
                                                                                                                       // 104
    // Force redrawing the `login-dropdown-list` element because of                                                    // 105
    // a bizarre Chrome bug in which part of the DIV is not redrawn                                                    // 106
    // in case you had tried to unsuccessfully log in before                                                           // 107
    // switching to the signup form.                                                                                   // 108
    //                                                                                                                 // 109
    // Found tip on how to force a redraw on                                                                           // 110
    // http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes/3485654#3485654
    var redraw = document.getElementById('login-dropdown-list');                                                       // 112
    redraw.style.display = 'none';                                                                                     // 113
    redraw.offsetHeight; // it seems that this line does nothing but is necessary for the redraw to work               // 114
    redraw.style.display = 'block';                                                                                    // 115
  },                                                                                                                   // 116
  'click #forgot-password-link': function () {                                                                         // 117
    loginButtonsSession.resetMessages();                                                                               // 118
                                                                                                                       // 119
    // store values of fields before swtiching to the signup form                                                      // 120
    var email = trimmedElementValueById('login-email');                                                                // 121
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                          // 122
                                                                                                                       // 123
    loginButtonsSession.set('inSignupFlow', false);                                                                    // 124
    loginButtonsSession.set('inForgotPasswordFlow', true);                                                             // 125
    // force the ui to update so that we have the approprate fields to fill in                                         // 126
    Tracker.flush();                                                                                                   // 127
                                                                                                                       // 128
    // update new fields with appropriate defaults                                                                     // 129
    if (email !== null)                                                                                                // 130
      document.getElementById('forgot-password-email').value = email;                                                  // 131
    else if (usernameOrEmail !== null)                                                                                 // 132
      if (usernameOrEmail.indexOf('@') !== -1)                                                                         // 133
        document.getElementById('forgot-password-email').value = usernameOrEmail;                                      // 134
                                                                                                                       // 135
  },                                                                                                                   // 136
  'click #back-to-login-link': function () {                                                                           // 137
    loginButtonsSession.resetMessages();                                                                               // 138
                                                                                                                       // 139
    var username = trimmedElementValueById('login-username');                                                          // 140
    var email = trimmedElementValueById('login-email')                                                                 // 141
          || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?                          // 142
    // notably not trimmed. a password could (?) start or end with a space                                             // 143
    var password = elementValueById('login-password');                                                                 // 144
                                                                                                                       // 145
    loginButtonsSession.set('inSignupFlow', false);                                                                    // 146
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                            // 147
    // force the ui to update so that we have the approprate fields to fill in                                         // 148
    Tracker.flush();                                                                                                   // 149
                                                                                                                       // 150
    if (document.getElementById('login-username'))                                                                     // 151
      document.getElementById('login-username').value = username;                                                      // 152
    if (document.getElementById('login-email'))                                                                        // 153
      document.getElementById('login-email').value = email;                                                            // 154
                                                                                                                       // 155
    if (document.getElementById('login-username-or-email'))                                                            // 156
      document.getElementById('login-username-or-email').value = email || username;                                    // 157
                                                                                                                       // 158
    if (password !== null)                                                                                             // 159
      document.getElementById('login-password').value = password;                                                      // 160
  },                                                                                                                   // 161
  'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function (event) {
    if (event.keyCode === 13)                                                                                          // 163
      loginOrSignup();                                                                                                 // 164
  }                                                                                                                    // 165
});                                                                                                                    // 166
                                                                                                                       // 167
Template._loginButtonsLoggedOutDropdown.helpers({                                                                      // 168
  // additional classes that can be helpful in styling the dropdown                                                    // 169
  additionalClasses: function () {                                                                                     // 170
    if (!hasPasswordService()) {                                                                                       // 171
      return false;                                                                                                    // 172
    } else {                                                                                                           // 173
      if (loginButtonsSession.get('inSignupFlow')) {                                                                   // 174
        return 'login-form-create-account';                                                                            // 175
      } else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                    // 176
        return 'login-form-forgot-password';                                                                           // 177
      } else {                                                                                                         // 178
        return 'login-form-sign-in';                                                                                   // 179
      }                                                                                                                // 180
    }                                                                                                                  // 181
  },                                                                                                                   // 182
                                                                                                                       // 183
  dropdownVisible: function () {                                                                                       // 184
    return loginButtonsSession.get('dropdownVisible');                                                                 // 185
  },                                                                                                                   // 186
                                                                                                                       // 187
  hasPasswordService: hasPasswordService                                                                               // 188
});                                                                                                                    // 189
                                                                                                                       // 190
// return all login services, with password last                                                                       // 191
Template._loginButtonsLoggedOutAllServices.helpers({                                                                   // 192
  services: getLoginServices,                                                                                          // 193
                                                                                                                       // 194
  isPasswordService: function () {                                                                                     // 195
    return this.name === 'password';                                                                                   // 196
  },                                                                                                                   // 197
                                                                                                                       // 198
  hasOtherServices: function () {                                                                                      // 199
    return getLoginServices().length > 1;                                                                              // 200
  },                                                                                                                   // 201
                                                                                                                       // 202
  hasPasswordService: hasPasswordService                                                                               // 203
});                                                                                                                    // 204
                                                                                                                       // 205
Template._loginButtonsLoggedOutPasswordService.helpers({                                                               // 206
  fields: function () {                                                                                                // 207
    var loginFields = [                                                                                                // 208
      {fieldName: 'username-or-email', fieldLabel: 'Username or Email',                                                // 209
       visible: function () {                                                                                          // 210
         return _.contains(                                                                                            // 211
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                                                      // 212
           passwordSignupFields());                                                                                    // 213
       }},                                                                                                             // 214
      {fieldName: 'username', fieldLabel: 'Username',                                                                  // 215
       visible: function () {                                                                                          // 216
         return passwordSignupFields() === "USERNAME_ONLY";                                                            // 217
       }},                                                                                                             // 218
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 219
       visible: function () {                                                                                          // 220
         return passwordSignupFields() === "EMAIL_ONLY";                                                               // 221
       }},                                                                                                             // 222
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 223
       visible: function () {                                                                                          // 224
         return true;                                                                                                  // 225
       }}                                                                                                              // 226
    ];                                                                                                                 // 227
                                                                                                                       // 228
    var signupFields = [                                                                                               // 229
      {fieldName: 'username', fieldLabel: 'Username',                                                                  // 230
       visible: function () {                                                                                          // 231
         return _.contains(                                                                                            // 232
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                     // 233
           passwordSignupFields());                                                                                    // 234
       }},                                                                                                             // 235
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 236
       visible: function () {                                                                                          // 237
         return _.contains(                                                                                            // 238
           ["USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                                                       // 239
           passwordSignupFields());                                                                                    // 240
       }},                                                                                                             // 241
      {fieldName: 'email', fieldLabel: 'Email (optional)', inputType: 'email',                                         // 242
       visible: function () {                                                                                          // 243
         return passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                              // 244
       }},                                                                                                             // 245
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 246
       visible: function () {                                                                                          // 247
         return true;                                                                                                  // 248
       }},                                                                                                             // 249
      {fieldName: 'password-again', fieldLabel: 'Password (again)',                                                    // 250
       inputType: 'password',                                                                                          // 251
       visible: function () {                                                                                          // 252
         // No need to make users double-enter their password if                                                       // 253
         // they'll necessarily have an email set, since they can use                                                  // 254
         // the "forgot password" flow.                                                                                // 255
         return _.contains(                                                                                            // 256
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 257
           passwordSignupFields());                                                                                    // 258
       }}                                                                                                              // 259
    ];                                                                                                                 // 260
                                                                                                                       // 261
    return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                       // 262
  },                                                                                                                   // 263
                                                                                                                       // 264
  inForgotPasswordFlow: function () {                                                                                  // 265
    return loginButtonsSession.get('inForgotPasswordFlow');                                                            // 266
  },                                                                                                                   // 267
                                                                                                                       // 268
  inLoginFlow: function () {                                                                                           // 269
    return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');               // 270
  },                                                                                                                   // 271
                                                                                                                       // 272
  inSignupFlow: function () {                                                                                          // 273
    return loginButtonsSession.get('inSignupFlow');                                                                    // 274
  },                                                                                                                   // 275
                                                                                                                       // 276
  showCreateAccountLink: function () {                                                                                 // 277
    return !Accounts._options.forbidClientAccountCreation;                                                             // 278
  },                                                                                                                   // 279
                                                                                                                       // 280
  showForgotPasswordLink: function () {                                                                                // 281
    return _.contains(                                                                                                 // 282
      ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                                             // 283
      passwordSignupFields());                                                                                         // 284
  }                                                                                                                    // 285
});                                                                                                                    // 286
                                                                                                                       // 287
Template._loginButtonsFormField.helpers({                                                                              // 288
  inputType: function () {                                                                                             // 289
    return this.inputType || "text";                                                                                   // 290
  }                                                                                                                    // 291
});                                                                                                                    // 292
                                                                                                                       // 293
                                                                                                                       // 294
//                                                                                                                     // 295
// loginButtonsChangePassword template                                                                                 // 296
//                                                                                                                     // 297
                                                                                                                       // 298
Template._loginButtonsChangePassword.events({                                                                          // 299
  'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function (event) {         // 300
    if (event.keyCode === 13)                                                                                          // 301
      changePassword();                                                                                                // 302
  },                                                                                                                   // 303
  'click #login-buttons-do-change-password': function () {                                                             // 304
    changePassword();                                                                                                  // 305
  }                                                                                                                    // 306
});                                                                                                                    // 307
                                                                                                                       // 308
Template._loginButtonsChangePassword.helpers({                                                                         // 309
  fields: function () {                                                                                                // 310
    return [                                                                                                           // 311
      {fieldName: 'old-password', fieldLabel: 'Current Password', inputType: 'password',                               // 312
       visible: function () {                                                                                          // 313
         return true;                                                                                                  // 314
       }},                                                                                                             // 315
      {fieldName: 'password', fieldLabel: 'New Password', inputType: 'password',                                       // 316
       visible: function () {                                                                                          // 317
         return true;                                                                                                  // 318
       }},                                                                                                             // 319
      {fieldName: 'password-again', fieldLabel: 'New Password (again)',                                                // 320
       inputType: 'password',                                                                                          // 321
       visible: function () {                                                                                          // 322
         // No need to make users double-enter their password if                                                       // 323
         // they'll necessarily have an email set, since they can use                                                  // 324
         // the "forgot password" flow.                                                                                // 325
         return _.contains(                                                                                            // 326
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 327
           passwordSignupFields());                                                                                    // 328
       }}                                                                                                              // 329
    ];                                                                                                                 // 330
  }                                                                                                                    // 331
});                                                                                                                    // 332
                                                                                                                       // 333
                                                                                                                       // 334
//                                                                                                                     // 335
// helpers                                                                                                             // 336
//                                                                                                                     // 337
                                                                                                                       // 338
var elementValueById = function(id) {                                                                                  // 339
  var element = document.getElementById(id);                                                                           // 340
  if (!element)                                                                                                        // 341
    return null;                                                                                                       // 342
  else                                                                                                                 // 343
    return element.value;                                                                                              // 344
};                                                                                                                     // 345
                                                                                                                       // 346
var trimmedElementValueById = function(id) {                                                                           // 347
  var element = document.getElementById(id);                                                                           // 348
  if (!element)                                                                                                        // 349
    return null;                                                                                                       // 350
  else                                                                                                                 // 351
    return element.value.replace(/^\s*|\s*$/g, ""); // trim() doesn't work on IE8;                                     // 352
};                                                                                                                     // 353
                                                                                                                       // 354
var loginOrSignup = function () {                                                                                      // 355
  if (loginButtonsSession.get('inSignupFlow'))                                                                         // 356
    signup();                                                                                                          // 357
  else                                                                                                                 // 358
    login();                                                                                                           // 359
};                                                                                                                     // 360
                                                                                                                       // 361
var login = function () {                                                                                              // 362
  loginButtonsSession.resetMessages();                                                                                 // 363
                                                                                                                       // 364
  var username = trimmedElementValueById('login-username');                                                            // 365
  var email = trimmedElementValueById('login-email');                                                                  // 366
  var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                            // 367
  // notably not trimmed. a password could (?) start or end with a space                                               // 368
  var password = elementValueById('login-password');                                                                   // 369
                                                                                                                       // 370
  var loginSelector;                                                                                                   // 371
  if (username !== null) {                                                                                             // 372
    if (!validateUsername(username))                                                                                   // 373
      return;                                                                                                          // 374
    else                                                                                                               // 375
      loginSelector = {username: username};                                                                            // 376
  } else if (email !== null) {                                                                                         // 377
    if (!validateEmail(email))                                                                                         // 378
      return;                                                                                                          // 379
    else                                                                                                               // 380
      loginSelector = {email: email};                                                                                  // 381
  } else if (usernameOrEmail !== null) {                                                                               // 382
    // XXX not sure how we should validate this. but this seems good enough (for now),                                 // 383
    // since an email must have at least 3 characters anyways                                                          // 384
    if (!validateUsername(usernameOrEmail))                                                                            // 385
      return;                                                                                                          // 386
    else                                                                                                               // 387
      loginSelector = usernameOrEmail;                                                                                 // 388
  } else {                                                                                                             // 389
    throw new Error("Unexpected -- no element to use as a login user selector");                                       // 390
  }                                                                                                                    // 391
                                                                                                                       // 392
  Meteor.loginWithPassword(loginSelector, password, function (error, result) {                                         // 393
    if (error) {                                                                                                       // 394
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 395
    } else {                                                                                                           // 396
      loginButtonsSession.closeDropdown();                                                                             // 397
    }                                                                                                                  // 398
  });                                                                                                                  // 399
};                                                                                                                     // 400
                                                                                                                       // 401
var signup = function () {                                                                                             // 402
  loginButtonsSession.resetMessages();                                                                                 // 403
                                                                                                                       // 404
  var options = {}; // to be passed to Accounts.createUser                                                             // 405
                                                                                                                       // 406
  var username = trimmedElementValueById('login-username');                                                            // 407
  if (username !== null) {                                                                                             // 408
    if (!validateUsername(username))                                                                                   // 409
      return;                                                                                                          // 410
    else                                                                                                               // 411
      options.username = username;                                                                                     // 412
  }                                                                                                                    // 413
                                                                                                                       // 414
  var email = trimmedElementValueById('login-email');                                                                  // 415
  if (email !== null) {                                                                                                // 416
    if (!validateEmail(email))                                                                                         // 417
      return;                                                                                                          // 418
    else                                                                                                               // 419
      options.email = email;                                                                                           // 420
  }                                                                                                                    // 421
                                                                                                                       // 422
  // notably not trimmed. a password could (?) start or end with a space                                               // 423
  var password = elementValueById('login-password');                                                                   // 424
  if (!validatePassword(password))                                                                                     // 425
    return;                                                                                                            // 426
  else                                                                                                                 // 427
    options.password = password;                                                                                       // 428
                                                                                                                       // 429
  if (!matchPasswordAgainIfPresent())                                                                                  // 430
    return;                                                                                                            // 431
                                                                                                                       // 432
  Accounts.createUser(options, function (error) {                                                                      // 433
    if (error) {                                                                                                       // 434
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 435
    } else {                                                                                                           // 436
      loginButtonsSession.closeDropdown();                                                                             // 437
    }                                                                                                                  // 438
  });                                                                                                                  // 439
};                                                                                                                     // 440
                                                                                                                       // 441
var forgotPassword = function () {                                                                                     // 442
  loginButtonsSession.resetMessages();                                                                                 // 443
                                                                                                                       // 444
  var email = trimmedElementValueById("forgot-password-email");                                                        // 445
  if (email.indexOf('@') !== -1) {                                                                                     // 446
    Accounts.forgotPassword({email: email}, function (error) {                                                         // 447
      if (error)                                                                                                       // 448
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 449
      else                                                                                                             // 450
        loginButtonsSession.infoMessage("Email sent");                                                                 // 451
    });                                                                                                                // 452
  } else {                                                                                                             // 453
    loginButtonsSession.errorMessage("Invalid email");                                                                 // 454
  }                                                                                                                    // 455
};                                                                                                                     // 456
                                                                                                                       // 457
var changePassword = function () {                                                                                     // 458
  loginButtonsSession.resetMessages();                                                                                 // 459
                                                                                                                       // 460
  // notably not trimmed. a password could (?) start or end with a space                                               // 461
  var oldPassword = elementValueById('login-old-password');                                                            // 462
                                                                                                                       // 463
  // notably not trimmed. a password could (?) start or end with a space                                               // 464
  var password = elementValueById('login-password');                                                                   // 465
  if (!validatePassword(password))                                                                                     // 466
    return;                                                                                                            // 467
                                                                                                                       // 468
  if (!matchPasswordAgainIfPresent())                                                                                  // 469
    return;                                                                                                            // 470
                                                                                                                       // 471
  Accounts.changePassword(oldPassword, password, function (error) {                                                    // 472
    if (error) {                                                                                                       // 473
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                               // 474
    } else {                                                                                                           // 475
      loginButtonsSession.set('inChangePasswordFlow', false);                                                          // 476
      loginButtonsSession.set('inMessageOnlyFlow', true);                                                              // 477
      loginButtonsSession.infoMessage("Password changed");                                                             // 478
    }                                                                                                                  // 479
  });                                                                                                                  // 480
};                                                                                                                     // 481
                                                                                                                       // 482
var matchPasswordAgainIfPresent = function () {                                                                        // 483
  // notably not trimmed. a password could (?) start or end with a space                                               // 484
  var passwordAgain = elementValueById('login-password-again');                                                        // 485
  if (passwordAgain !== null) {                                                                                        // 486
    // notably not trimmed. a password could (?) start or end with a space                                             // 487
    var password = elementValueById('login-password');                                                                 // 488
    if (password !== passwordAgain) {                                                                                  // 489
      loginButtonsSession.errorMessage("Passwords don't match");                                                       // 490
      return false;                                                                                                    // 491
    }                                                                                                                  // 492
  }                                                                                                                    // 493
  return true;                                                                                                         // 494
};                                                                                                                     // 495
                                                                                                                       // 496
var correctDropdownZIndexes = function () {                                                                            // 497
  // IE <= 7 has a z-index bug that means we can't just give the                                                       // 498
  // dropdown a z-index and expect it to stack above the rest of                                                       // 499
  // the page even if nothing else has a z-index.  The nature of                                                       // 500
  // the bug is that all positioned elements are considered to                                                         // 501
  // have z-index:0 (not auto) and therefore start new stacking                                                        // 502
  // contexts, with ties broken by page order.                                                                         // 503
  //                                                                                                                   // 504
  // The fix, then is to give z-index:1 to all ancestors                                                               // 505
  // of the dropdown having z-index:0.                                                                                 // 506
  for(var n = document.getElementById('login-dropdown-list').parentNode;                                               // 507
      n.nodeName !== 'BODY';                                                                                           // 508
      n = n.parentNode)                                                                                                // 509
    if (n.style.zIndex === 0)                                                                                          // 510
      n.style.zIndex = 1;                                                                                              // 511
};                                                                                                                     // 512
                                                                                                                       // 513
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dialogs.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience                                                                                                     // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                               // 2
                                                                                                                       // 3
// since we don't want to pass around the callback that we get from our event                                          // 4
// handlers, we just make it a variable for the whole file                                                             // 5
var doneCallback;                                                                                                      // 6
                                                                                                                       // 7
Accounts.onResetPasswordLink(function (token, done) {                                                                  // 8
  loginButtonsSession.set("resetPasswordToken", token);                                                                // 9
  doneCallback = done;                                                                                                 // 10
});                                                                                                                    // 11
                                                                                                                       // 12
Accounts.onEnrollmentLink(function (token, done) {                                                                     // 13
  loginButtonsSession.set("enrollAccountToken", token);                                                                // 14
  doneCallback = done;                                                                                                 // 15
});                                                                                                                    // 16
                                                                                                                       // 17
Accounts.onEmailVerificationLink(function (token, done) {                                                              // 18
  Accounts.verifyEmail(token, function (error) {                                                                       // 19
    if (! error) {                                                                                                     // 20
      loginButtonsSession.set('justVerifiedEmail', true);                                                              // 21
    }                                                                                                                  // 22
                                                                                                                       // 23
    done();                                                                                                            // 24
    // XXX show something if there was an error.                                                                       // 25
  });                                                                                                                  // 26
});                                                                                                                    // 27
                                                                                                                       // 28
                                                                                                                       // 29
//                                                                                                                     // 30
// resetPasswordDialog template                                                                                        // 31
//                                                                                                                     // 32
                                                                                                                       // 33
Template._resetPasswordDialog.events({                                                                                 // 34
  'click #login-buttons-reset-password-button': function () {                                                          // 35
    resetPassword();                                                                                                   // 36
  },                                                                                                                   // 37
  'keypress #reset-password-new-password': function (event) {                                                          // 38
    if (event.keyCode === 13)                                                                                          // 39
      resetPassword();                                                                                                 // 40
  },                                                                                                                   // 41
  'click #login-buttons-cancel-reset-password': function () {                                                          // 42
    loginButtonsSession.set('resetPasswordToken', null);                                                               // 43
    doneCallback();                                                                                                    // 44
  }                                                                                                                    // 45
});                                                                                                                    // 46
                                                                                                                       // 47
var resetPassword = function () {                                                                                      // 48
  loginButtonsSession.resetMessages();                                                                                 // 49
  var newPassword = document.getElementById('reset-password-new-password').value;                                      // 50
  if (!validatePassword(newPassword))                                                                                  // 51
    return;                                                                                                            // 52
                                                                                                                       // 53
  Accounts.resetPassword(                                                                                              // 54
    loginButtonsSession.get('resetPasswordToken'), newPassword,                                                        // 55
    function (error) {                                                                                                 // 56
      if (error) {                                                                                                     // 57
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 58
      } else {                                                                                                         // 59
        loginButtonsSession.set('resetPasswordToken', null);                                                           // 60
        loginButtonsSession.set('justResetPassword', true);                                                            // 61
        doneCallback();                                                                                                // 62
      }                                                                                                                // 63
    });                                                                                                                // 64
};                                                                                                                     // 65
                                                                                                                       // 66
Template._resetPasswordDialog.helpers({                                                                                // 67
  inResetPasswordFlow: function () {                                                                                   // 68
    return loginButtonsSession.get('resetPasswordToken');                                                              // 69
  }                                                                                                                    // 70
});                                                                                                                    // 71
                                                                                                                       // 72
//                                                                                                                     // 73
// justResetPasswordDialog template                                                                                    // 74
//                                                                                                                     // 75
                                                                                                                       // 76
Template._justResetPasswordDialog.events({                                                                             // 77
  'click #just-verified-dismiss-button': function () {                                                                 // 78
    loginButtonsSession.set('justResetPassword', false);                                                               // 79
  }                                                                                                                    // 80
});                                                                                                                    // 81
                                                                                                                       // 82
Template._justResetPasswordDialog.helpers({                                                                            // 83
  visible: function () {                                                                                               // 84
    return loginButtonsSession.get('justResetPassword');                                                               // 85
  },                                                                                                                   // 86
  displayName: displayName                                                                                             // 87
});                                                                                                                    // 88
                                                                                                                       // 89
                                                                                                                       // 90
                                                                                                                       // 91
//                                                                                                                     // 92
// enrollAccountDialog template                                                                                        // 93
//                                                                                                                     // 94
                                                                                                                       // 95
Template._enrollAccountDialog.events({                                                                                 // 96
  'click #login-buttons-enroll-account-button': function () {                                                          // 97
    enrollAccount();                                                                                                   // 98
  },                                                                                                                   // 99
  'keypress #enroll-account-password': function (event) {                                                              // 100
    if (event.keyCode === 13)                                                                                          // 101
      enrollAccount();                                                                                                 // 102
  },                                                                                                                   // 103
  'click #login-buttons-cancel-enroll-account': function () {                                                          // 104
    loginButtonsSession.set('enrollAccountToken', null);                                                               // 105
    doneCallback();                                                                                                    // 106
  }                                                                                                                    // 107
});                                                                                                                    // 108
                                                                                                                       // 109
var enrollAccount = function () {                                                                                      // 110
  loginButtonsSession.resetMessages();                                                                                 // 111
  var password = document.getElementById('enroll-account-password').value;                                             // 112
  if (!validatePassword(password))                                                                                     // 113
    return;                                                                                                            // 114
                                                                                                                       // 115
  Accounts.resetPassword(                                                                                              // 116
    loginButtonsSession.get('enrollAccountToken'), password,                                                           // 117
    function (error) {                                                                                                 // 118
      if (error) {                                                                                                     // 119
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 120
      } else {                                                                                                         // 121
        loginButtonsSession.set('enrollAccountToken', null);                                                           // 122
        doneCallback();                                                                                                // 123
      }                                                                                                                // 124
    });                                                                                                                // 125
};                                                                                                                     // 126
                                                                                                                       // 127
Template._enrollAccountDialog.helpers({                                                                                // 128
  inEnrollAccountFlow: function () {                                                                                   // 129
    return loginButtonsSession.get('enrollAccountToken');                                                              // 130
  }                                                                                                                    // 131
});                                                                                                                    // 132
                                                                                                                       // 133
                                                                                                                       // 134
//                                                                                                                     // 135
// justVerifiedEmailDialog template                                                                                    // 136
//                                                                                                                     // 137
                                                                                                                       // 138
Template._justVerifiedEmailDialog.events({                                                                             // 139
  'click #just-verified-dismiss-button': function () {                                                                 // 140
    loginButtonsSession.set('justVerifiedEmail', false);                                                               // 141
  }                                                                                                                    // 142
});                                                                                                                    // 143
                                                                                                                       // 144
Template._justVerifiedEmailDialog.helpers({                                                                            // 145
  visible: function () {                                                                                               // 146
    return loginButtonsSession.get('justVerifiedEmail');                                                               // 147
  },                                                                                                                   // 148
  displayName: displayName                                                                                             // 149
});                                                                                                                    // 150
                                                                                                                       // 151
                                                                                                                       // 152
//                                                                                                                     // 153
// loginButtonsMessagesDialog template                                                                                 // 154
//                                                                                                                     // 155
                                                                                                                       // 156
Template._loginButtonsMessagesDialog.events({                                                                          // 157
  'click #messages-dialog-dismiss-button': function () {                                                               // 158
    loginButtonsSession.resetMessages();                                                                               // 159
  }                                                                                                                    // 160
});                                                                                                                    // 161
                                                                                                                       // 162
Template._loginButtonsMessagesDialog.helpers({                                                                         // 163
  visible: function () {                                                                                               // 164
    var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                // 165
    return !dropdown() && hasMessage;                                                                                  // 166
  }                                                                                                                    // 167
});                                                                                                                    // 168
                                                                                                                       // 169
                                                                                                                       // 170
//                                                                                                                     // 171
// configureLoginServiceDialog template                                                                                // 172
//                                                                                                                     // 173
                                                                                                                       // 174
Template._configureLoginServiceDialog.events({                                                                         // 175
  'click .configure-login-service-dismiss-button': function () {                                                       // 176
    loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                              // 177
  },                                                                                                                   // 178
  'click #configure-login-service-dialog-save-configuration': function () {                                            // 179
    if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                               // 180
        ! loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                        // 181
      // Prepare the configuration document for this login service                                                     // 182
      var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                             // 183
      var configuration = {                                                                                            // 184
        service: serviceName                                                                                           // 185
      };                                                                                                               // 186
                                                                                                                       // 187
      // Fetch the value of each input field                                                                           // 188
      _.each(configurationFields(), function(field) {                                                                  // 189
        configuration[field.property] = document.getElementById(                                                       // 190
          'configure-login-service-dialog-' + field.property).value                                                    // 191
          .replace(/^\s*|\s*$/g, ""); // trim() doesnt work on IE8;                                                    // 192
      });                                                                                                              // 193
                                                                                                                       // 194
      configuration.loginStyle =                                                                                       // 195
        $('#configure-login-service-dialog input[name="loginStyle"]:checked')                                          // 196
        .val();                                                                                                        // 197
                                                                                                                       // 198
      // Configure this login service                                                                                  // 199
      Accounts.connection.call(                                                                                        // 200
        "configureLoginService", configuration, function (error, result) {                                             // 201
          if (error)                                                                                                   // 202
            Meteor._debug("Error configuring login service " + serviceName,                                            // 203
                          error);                                                                                      // 204
          else                                                                                                         // 205
            loginButtonsSession.set('configureLoginServiceDialogVisible',                                              // 206
                                    false);                                                                            // 207
        });                                                                                                            // 208
    }                                                                                                                  // 209
  },                                                                                                                   // 210
  // IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                          // 211
  // well. (Keeping the 'input' event means that this also fires when you use                                          // 212
  // the mouse to change the contents of the field, eg 'Cut' menu item.)                                               // 213
  'input, keyup input': function (event) {                                                                             // 214
    // if the event fired on one of the configuration input fields,                                                    // 215
    // check whether we should enable the 'save configuration' button                                                  // 216
    if (event.target.id.indexOf('configure-login-service-dialog') === 0)                                               // 217
      updateSaveDisabled();                                                                                            // 218
  }                                                                                                                    // 219
});                                                                                                                    // 220
                                                                                                                       // 221
// check whether the 'save configuration' button should be enabled.                                                    // 222
// this is a really strange way to implement this and a Forms                                                          // 223
// Abstraction would make all of this reactive, and simpler.                                                           // 224
var updateSaveDisabled = function () {                                                                                 // 225
  var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                   // 226
    return document.getElementById(                                                                                    // 227
      'configure-login-service-dialog-' + field.property).value === '';                                                // 228
  });                                                                                                                  // 229
                                                                                                                       // 230
  loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                   // 231
};                                                                                                                     // 232
                                                                                                                       // 233
// Returns the appropriate template for this login service.  This                                                      // 234
// template should be defined in the service's package                                                                 // 235
var configureLoginServiceDialogTemplateForService = function () {                                                      // 236
  var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                                 // 237
  // XXX Service providers should be able to specify their configuration                                               // 238
  // template name.                                                                                                    // 239
  return Template['configureLoginServiceDialogFor' +                                                                   // 240
                  (serviceName === 'meteor-developer' ?                                                                // 241
                   'MeteorDeveloper' :                                                                                 // 242
                   capitalize(serviceName))];                                                                          // 243
};                                                                                                                     // 244
                                                                                                                       // 245
var configurationFields = function () {                                                                                // 246
  var template = configureLoginServiceDialogTemplateForService();                                                      // 247
  return template.fields();                                                                                            // 248
};                                                                                                                     // 249
                                                                                                                       // 250
Template._configureLoginServiceDialog.helpers({                                                                        // 251
  configurationFields: function () {                                                                                   // 252
    return configurationFields();                                                                                      // 253
  },                                                                                                                   // 254
  visible: function () {                                                                                               // 255
    return loginButtonsSession.get('configureLoginServiceDialogVisible');                                              // 256
  },                                                                                                                   // 257
  configurationSteps: function () {                                                                                    // 258
    // renders the appropriate template                                                                                // 259
    return configureLoginServiceDialogTemplateForService();                                                            // 260
  },                                                                                                                   // 261
  saveDisabled: function () {                                                                                          // 262
    return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                         // 263
  }                                                                                                                    // 264
});                                                                                                                    // 265
                                                                                                                       // 266
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                         // 267
var capitalize = function(str){                                                                                        // 268
  str = str == null ? '' : String(str);                                                                                // 269
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                   // 270
};                                                                                                                     // 271
                                                                                                                       // 272
Template._configureLoginOnDesktopDialog.helpers({                                                                      // 273
  visible: function () {                                                                                               // 274
    return loginButtonsSession.get('configureOnDesktopVisible');                                                       // 275
  }                                                                                                                    // 276
});                                                                                                                    // 277
                                                                                                                       // 278
Template._configureLoginOnDesktopDialog.events({                                                                       // 279
  'click #configure-on-desktop-dismiss-button': function () {                                                          // 280
    loginButtonsSession.set('configureOnDesktopVisible', false);                                                       // 281
  }                                                                                                                    // 282
});                                                                                                                    // 283
                                                                                                                       // 284
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-ui-unstyled'] = {};

})();
