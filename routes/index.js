var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageData: {title: 'Express'}});
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/' }));

router.get('/dashboard', function(req, res) {
	console.log(req.user);
	res.render('dashboard', {pageData: {title: 'Dashboard', userName: req.user.displayName}});
});

module.exports = router;
