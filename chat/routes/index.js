var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(!global.user)
  	res.render('dashboard', {pageData: {title: 'Dashboard', userName: global.user.displayName}})
  else 
  	res.render('index', { pageData: {title: 'Express'}});

});

router.get('/login', passport.authenticate('facebook'));



module.exports = router;
