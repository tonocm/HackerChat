var express = require('express');
var passport = require('passport');
var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient('e4a7466d2f67dfb1045c8d60e7efc1');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

//groupme for the lolz.
var API = require('groupme').Stateless
const ACCESS_TOKEN = "eb57d1304f9301326e4e4a62284ce1cf";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageData: {title: 'HackerChat'}});
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/profile' }));

router.get('/profile', function(req,res) {
	console.log(req);
	res.render('profile', {pageData: {title: 'Set Profile'}})
});

router.get('/about', function(req, res){
	res.render('about', {pageData: {title: 'About'}});
});

router.get('/contact', function(req, res){
	res.render('contact');
});

router.get('/saveprofile', function(req,res){
	console.log(req);
	var Parse = require('parse').Parse;
	Parse.initialize("movT7QRzOiKtcjXzmU5z79EGWk5xqTnfDdv6lVRR", "XGqPpaAI8ZqJnMfUwu78VMJ2jVnCYe9puGMe2ISE");
	var TestObject = Parse.Object.extend("myUser");
	var query = new Parse.Query(TestObject);
    query.equalTo("fId", req.user.id);
    query.find({
      success: function(results) {
        query.get(results[0].id, {
        	success: function(foundUser) {
			  console.log(req.query);
			  foundUser.set('interest',req.query.interest);
			  foundUser.set('language',req.query.language);
			  foundUser.set('industry',req.query.industry);
			  foundUser.set('experience',req.query.experience);
			  foundUser.save();
			},
			error: function(object, error) {
			  // The object was not retrieved successfully.
			  // error is a Parse.Error with an error code and message.
			}
        });
        res.redirect('/auth/facebook');
      },
      error: function(error) {
        console.log(error);
      }
    });
	//var string = encodeURIComponent(JSON.stringify(req.query));
	//console.log(req.user.id)

})

router.get('/dashboard', function(req, res) {
	var request = require("request");
	var Parse = require('parse').Parse;
	Parse.initialize("movT7QRzOiKtcjXzmU5z79EGWk5xqTnfDdv6lVRR", "XGqPpaAI8ZqJnMfUwu78VMJ2jVnCYe9puGMe2ISE");
	var TestObject = Parse.Object.extend("myUser");
	var query = new Parse.Query(TestObject);
    query.equalTo("fId", req.user.id);
    query.find({
      success: function(results) {
        if(results[0]._serverData.firstTime){
			query.get(results[0].id, {
			  success: function(foundUser) {
			    foundUser.set("firstTime",false);
			    foundUser.save();
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and message.
			  }
			});

		res.redirect('profile');
        } else{
        	request("https://www.kimonolabs.com/api/audifm3o?apikey=fri4pwNK0GT19RPNI7L1lJ8FjvrAI50Y",
			function(err, response, body) {
			  res.render('dashboard', {pageData: {title: 'Select a Hackathon', userName: req.user.displayName, body: JSON.parse(body), pic: req.user._json.picture.data.url}});
			});
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
});

router.get('/hack', function(req, res) {
    API.Users.me(ACCESS_TOKEN, function(err,ret) {
          if (!err) {
            console.log("Your user id is", ret.id, "and your name is", ret.name);
            res.render('hack', {pageData: {title: req.query.hackathon}});
        } else {
            res.render('hack', {pageData: {title: req.query.hackathon}});
          }
    });
});

router.get('/chat', function(req, res){

	hipchat.api.rooms.list({}, function (err, res2) {
	  if (err) { throw err; }

	  for(i=0; i < res2['rooms'].length; i++){

	  	if(res2['rooms'][i].name === "Testing") { // name === name of hackathon

	  		hipchat.api.rooms.message({
			  room_id: res2['rooms'][i].room_id,
			  from: 'tonocm', //username
			  message: 'Hello World!', //user's message
			  format: 'text',
			  color: 'green',
			  notify: 1
			}, function (err, res) {
			  if (err) { throw err; }
			  console.log(res);
			});
	  	}

	  	console.log(res2['rooms'][i].name);
	  	console.log(res2['rooms'][i].room_id);

	  }
	  res.render('chat', {pageData: res2});
	});
});




module.exports = router;
