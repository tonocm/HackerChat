var express = require('express');
var passport = require('passport');

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
    console.log(req);
	res.render('hack', {pageData: {title: 'Your Hackathons', userName: req.user.displayName}});
});

module.exports = router;
