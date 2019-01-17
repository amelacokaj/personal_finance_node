const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.use(new LocalStrategy(function (username, password, done) {
        User.findByUsername(username)
            .then(function(user) {
                if (!user) {
                    return done(null, false, { message: 'Unknown User' });
                }

                User.comparePassword(password, user.get('password'), function (err, isMatch) {
                    if (err) throw err;
                    
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            })
            .catch(function(err) {
                throw err;
            });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function(user) {
                return done(null, user);
            })
            .catch(function(err) {
                throw err;
            });
    });

};
