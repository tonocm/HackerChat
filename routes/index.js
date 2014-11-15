var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageData: {title: 'Express'}});
});

router.get('/login', passport.authenticate('facebook'));

router.get('/dashboard', function(req, res) {
	res.render('dashboard', {pageData: {title: 'Dashboard', userName: global.user.displayName}});
});

module.exports = router;
