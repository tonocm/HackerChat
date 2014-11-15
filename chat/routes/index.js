var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageData: {title: 'Express'}});
});

//router.get('/facebook', function(req, res) {
 // res.send('im the about page!');
//});

router.get('/login', passport.authenticate('facebook'));

module.exports = router;
