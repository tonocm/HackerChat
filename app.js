var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var Parse = require('parse').Parse;
Parse.initialize("Your App Id", "Your JavaScript Key");

var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/chat', chat);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//=========== PASSPORT ===========

var Parse = require('parse').Parse;
 
Parse.initialize("movT7QRzOiKtcjXzmU5z79EGWk5xqTnfDdv6lVRR", "XGqPpaAI8ZqJnMfUwu78VMJ2jVnCYe9puGMe2ISE");

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: 829243480452780,
    clientSecret: "dacd90a2b422b99a8051e5f6c52e76b6",
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var TestObject = Parse.Object.extend("myUser");
    var query = new Parse.Query(TestObject);
    query.equalTo("fId", profile.id);
    query.find({
      success: function(usersPosts) {
        console.log("entered");
      }
    });
    console.log(profile.displayName);
    console.log(profile.id);
    var testObject = new TestObject();
    testObject.save({fId: profile.id, name: profile.displayName,
                      experience: "zero", language: "all", team: "none", interest: "all"}, {
      success: function(object) {
        console.log("saved");
      }
    })

    done(null,profile);
  }
));


//================================


module.exports = app;