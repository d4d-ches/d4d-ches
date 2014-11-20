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
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var SHA256 = Package.sha.SHA256;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var DDP = Package.ddp.DDP;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/accounts-password/password_client.js                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// Attempt to log in with a password.                                                                         // 1
//                                                                                                            // 2
// @param selector {String|Object} One of the following:                                                      // 3
//   - {username: (username)}                                                                                 // 4
//   - {email: (email)}                                                                                       // 5
//   - a string which may be a username or email, depending on whether                                        // 6
//     it contains "@".                                                                                       // 7
// @param password {String}                                                                                   // 8
// @param callback {Function(error|undefined)}                                                                // 9
                                                                                                              // 10
/**                                                                                                           // 11
 * @summary Log the user in with a password.                                                                  // 12
 * @locus Client                                                                                              // 13
 * @param {Object | String} user Either a string interpreted as a username or an email; or an object with a single key: `email`, `username` or `id`.
 * @param {String} password The user's password.                                                              // 15
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 17
Meteor.loginWithPassword = function (selector, password, callback) {                                          // 18
  if (typeof selector === 'string')                                                                           // 19
    if (selector.indexOf('@') === -1)                                                                         // 20
      selector = {username: selector};                                                                        // 21
    else                                                                                                      // 22
      selector = {email: selector};                                                                           // 23
                                                                                                              // 24
  Accounts.callLoginMethod({                                                                                  // 25
    methodArguments: [{                                                                                       // 26
      user: selector,                                                                                         // 27
      password: hashPassword(password)                                                                        // 28
    }],                                                                                                       // 29
    userCallback: function (error, result) {                                                                  // 30
      if (error && error.error === 400 &&                                                                     // 31
          error.reason === 'old password format') {                                                           // 32
        // The "reason" string should match the error thrown in the                                           // 33
        // password login handler in password_server.js.                                                      // 34
                                                                                                              // 35
        // XXX COMPAT WITH 0.8.1.3                                                                            // 36
        // If this user's last login was with a previous version of                                           // 37
        // Meteor that used SRP, then the server throws this error to                                         // 38
        // indicate that we should try again. The error includes the                                          // 39
        // user's SRP identity. We provide a value derived from the                                           // 40
        // identity and the password to prove to the server that we know                                      // 41
        // the password without requiring a full SRP flow, as well as                                         // 42
        // SHA256(password), which the server bcrypts and stores in                                           // 43
        // place of the old SRP information for this user.                                                    // 44
        srpUpgradePath({                                                                                      // 45
          upgradeError: error,                                                                                // 46
          userSelector: selector,                                                                             // 47
          plaintextPassword: password                                                                         // 48
        }, callback);                                                                                         // 49
      }                                                                                                       // 50
      else if (error) {                                                                                       // 51
        callback && callback(error);                                                                          // 52
      } else {                                                                                                // 53
        callback && callback();                                                                               // 54
      }                                                                                                       // 55
    }                                                                                                         // 56
  });                                                                                                         // 57
};                                                                                                            // 58
                                                                                                              // 59
var hashPassword = function (password) {                                                                      // 60
  return {                                                                                                    // 61
    digest: SHA256(password),                                                                                 // 62
    algorithm: "sha-256"                                                                                      // 63
  };                                                                                                          // 64
};                                                                                                            // 65
                                                                                                              // 66
// XXX COMPAT WITH 0.8.1.3                                                                                    // 67
// The server requested an upgrade from the old SRP password format,                                          // 68
// so supply the needed SRP identity to login. Options:                                                       // 69
//   - upgradeError: the error object that the server returned to tell                                        // 70
//     us to upgrade from SRP to bcrypt.                                                                      // 71
//   - userSelector: selector to retrieve the user object                                                     // 72
//   - plaintextPassword: the password as a string                                                            // 73
var srpUpgradePath = function (options, callback) {                                                           // 74
  var details;                                                                                                // 75
  try {                                                                                                       // 76
    details = EJSON.parse(options.upgradeError.details);                                                      // 77
  } catch (e) {}                                                                                              // 78
  if (!(details && details.format === 'srp')) {                                                               // 79
    callback && callback(                                                                                     // 80
      new Meteor.Error(400, "Password is old. Please reset your " +                                           // 81
                       "password."));                                                                         // 82
  } else {                                                                                                    // 83
    Accounts.callLoginMethod({                                                                                // 84
      methodArguments: [{                                                                                     // 85
        user: options.userSelector,                                                                           // 86
        srp: SHA256(details.identity + ":" + options.plaintextPassword),                                      // 87
        password: hashPassword(options.plaintextPassword)                                                     // 88
      }],                                                                                                     // 89
      userCallback: callback                                                                                  // 90
    });                                                                                                       // 91
  }                                                                                                           // 92
};                                                                                                            // 93
                                                                                                              // 94
                                                                                                              // 95
// Attempt to log in as a new user.                                                                           // 96
                                                                                                              // 97
/**                                                                                                           // 98
 * @summary Create a new user.                                                                                // 99
 * @locus Anywhere                                                                                            // 100
 * @param {Object} options                                                                                    // 101
 * @param {String} options.username A unique name for this user.                                              // 102
 * @param {String} options.email The user's email address.                                                    // 103
 * @param {String} options.password The user's password. This is __not__ sent in plain text over the wire.    // 104
 * @param {Object} options.profile The user's profile, typically including the `name` field.                  // 105
 * @param {Function} [callback] Client only, optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 107
Accounts.createUser = function (options, callback) {                                                          // 108
  options = _.clone(options); // we'll be modifying options                                                   // 109
                                                                                                              // 110
  if (typeof options.password !== 'string')                                                                   // 111
    throw new Error("Must set options.password");                                                             // 112
  if (!options.password) {                                                                                    // 113
    callback(new Meteor.Error(400, "Password may not be empty"));                                             // 114
    return;                                                                                                   // 115
  }                                                                                                           // 116
                                                                                                              // 117
  // Replace password with the hashed password.                                                               // 118
  options.password = hashPassword(options.password);                                                          // 119
                                                                                                              // 120
  Accounts.callLoginMethod({                                                                                  // 121
    methodName: 'createUser',                                                                                 // 122
    methodArguments: [options],                                                                               // 123
    userCallback: callback                                                                                    // 124
  });                                                                                                         // 125
};                                                                                                            // 126
                                                                                                              // 127
                                                                                                              // 128
                                                                                                              // 129
// Change password. Must be logged in.                                                                        // 130
//                                                                                                            // 131
// @param oldPassword {String|null} By default servers no longer allow                                        // 132
//   changing password without the old password, but they could so we                                         // 133
//   support passing no password to the server and letting it decide.                                         // 134
// @param newPassword {String}                                                                                // 135
// @param callback {Function(error|undefined)}                                                                // 136
                                                                                                              // 137
/**                                                                                                           // 138
 * @summary Change the current user's password. Must be logged in.                                            // 139
 * @locus Client                                                                                              // 140
 * @param {String} oldPassword The user's current password. This is __not__ sent in plain text over the wire. // 141
 * @param {String} newPassword A new password for the user. This is __not__ sent in plain text over the wire. // 142
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 144
Accounts.changePassword = function (oldPassword, newPassword, callback) {                                     // 145
  if (!Meteor.user()) {                                                                                       // 146
    callback && callback(new Error("Must be logged in to change password."));                                 // 147
    return;                                                                                                   // 148
  }                                                                                                           // 149
                                                                                                              // 150
  check(newPassword, String);                                                                                 // 151
  if (!newPassword) {                                                                                         // 152
    callback(new Meteor.Error(400, "Password may not be empty"));                                             // 153
    return;                                                                                                   // 154
  }                                                                                                           // 155
                                                                                                              // 156
  Accounts.connection.apply(                                                                                  // 157
    'changePassword',                                                                                         // 158
    [oldPassword ? hashPassword(oldPassword) : null, hashPassword(newPassword)],                              // 159
    function (error, result) {                                                                                // 160
      if (error || !result) {                                                                                 // 161
        if (error && error.error === 400 &&                                                                   // 162
            error.reason === 'old password format') {                                                         // 163
          // XXX COMPAT WITH 0.8.1.3                                                                          // 164
          // The server is telling us to upgrade from SRP to bcrypt, as                                       // 165
          // in Meteor.loginWithPassword.                                                                     // 166
          srpUpgradePath({                                                                                    // 167
            upgradeError: error,                                                                              // 168
            userSelector: { id: Meteor.userId() },                                                            // 169
            plaintextPassword: oldPassword                                                                    // 170
          }, function (err) {                                                                                 // 171
            if (err) {                                                                                        // 172
              callback && callback(err);                                                                      // 173
            } else {                                                                                          // 174
              // Now that we've successfully migrated from srp to                                             // 175
              // bcrypt, try changing the password again.                                                     // 176
              Accounts.changePassword(oldPassword, newPassword, callback);                                    // 177
            }                                                                                                 // 178
          });                                                                                                 // 179
        } else {                                                                                              // 180
          // A normal error, not an error telling us to upgrade to bcrypt                                     // 181
          callback && callback(                                                                               // 182
            error || new Error("No result from changePassword."));                                            // 183
        }                                                                                                     // 184
      } else {                                                                                                // 185
        callback && callback();                                                                               // 186
      }                                                                                                       // 187
    }                                                                                                         // 188
  );                                                                                                          // 189
};                                                                                                            // 190
                                                                                                              // 191
// Sends an email to a user with a link that can be used to reset                                             // 192
// their password                                                                                             // 193
//                                                                                                            // 194
// @param options {Object}                                                                                    // 195
//   - email: (email)                                                                                         // 196
// @param callback (optional) {Function(error|undefined)}                                                     // 197
                                                                                                              // 198
/**                                                                                                           // 199
 * @summary Request a forgot password email.                                                                  // 200
 * @locus Client                                                                                              // 201
 * @param {Object} options                                                                                    // 202
 * @param {String} options.email The email address to send a password reset link.                             // 203
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 205
Accounts.forgotPassword = function(options, callback) {                                                       // 206
  if (!options.email)                                                                                         // 207
    throw new Error("Must pass options.email");                                                               // 208
  Accounts.connection.call("forgotPassword", options, callback);                                              // 209
};                                                                                                            // 210
                                                                                                              // 211
// Resets a password based on a token originally created by                                                   // 212
// Accounts.forgotPassword, and then logs in the matching user.                                               // 213
//                                                                                                            // 214
// @param token {String}                                                                                      // 215
// @param newPassword {String}                                                                                // 216
// @param callback (optional) {Function(error|undefined)}                                                     // 217
                                                                                                              // 218
/**                                                                                                           // 219
 * @summary Reset the password for a user using a token received in email. Logs the user in afterwards.       // 220
 * @locus Client                                                                                              // 221
 * @param {String} token The token retrieved from the reset password URL.                                     // 222
 * @param {String} newPassword A new password for the user. This is __not__ sent in plain text over the wire. // 223
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 225
Accounts.resetPassword = function(token, newPassword, callback) {                                             // 226
  check(token, String);                                                                                       // 227
  check(newPassword, String);                                                                                 // 228
                                                                                                              // 229
  if (!newPassword) {                                                                                         // 230
    callback(new Meteor.Error(400, "Password may not be empty"));                                             // 231
    return;                                                                                                   // 232
  }                                                                                                           // 233
                                                                                                              // 234
  Accounts.callLoginMethod({                                                                                  // 235
    methodName: 'resetPassword',                                                                              // 236
    methodArguments: [token, hashPassword(newPassword)],                                                      // 237
    userCallback: callback});                                                                                 // 238
};                                                                                                            // 239
                                                                                                              // 240
// Verifies a user's email address based on a token originally                                                // 241
// created by Accounts.sendVerificationEmail                                                                  // 242
//                                                                                                            // 243
// @param token {String}                                                                                      // 244
// @param callback (optional) {Function(error|undefined)}                                                     // 245
                                                                                                              // 246
/**                                                                                                           // 247
 * @summary Marks the user's email address as verified. Logs the user in afterwards.                          // 248
 * @locus Client                                                                                              // 249
 * @param {String} token The token retrieved from the verification URL.                                       // 250
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 */                                                                                                           // 252
Accounts.verifyEmail = function(token, callback) {                                                            // 253
  if (!token)                                                                                                 // 254
    throw new Error("Need to pass token");                                                                    // 255
                                                                                                              // 256
  Accounts.callLoginMethod({                                                                                  // 257
    methodName: 'verifyEmail',                                                                                // 258
    methodArguments: [token],                                                                                 // 259
    userCallback: callback});                                                                                 // 260
};                                                                                                            // 261
                                                                                                              // 262
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();
