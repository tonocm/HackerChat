var express = require('express');
var passport = require('passport');
var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient('e4a7466d2f67dfb1045c8d60e7efc1');

var LocalStorage = require('node-localstorage').LocalStorage;
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageData: {title: 'HackerChat'}});
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/profile' }));

router.get('/profile', function(req,res) {
	res.render('profile', {pageData: {title: 'Set Profile'}})
});

router.get('/dashboard', function(req, res) {
	var request = require("request");

	request("https://www.kimonolabs.com/api/audifm3o?apikey=fri4pwNK0GT19RPNI7L1lJ8FjvrAI50Y",
	function(err, response, body) {
	  res.render('dashboard', {pageData: {title: 'Select a Hackathon', userName: req.user.displayName, body: JSON.parse(body)}});
	});
});

router.get('/hack', function(req, res) {
	res.render('hack', {pageData: {title: req.query.hackathon}});
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
