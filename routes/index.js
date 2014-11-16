var express = require('express');
var passport = require('passport');
var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient('e4a7466d2f67dfb1045c8d60e7efc1');
var FacebookStrategy = require('passport-facebook');
var router = express.Router();
var https = require('https');
var curl = require('node-curl');

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
			  foundUser.set('team',req.query.team);
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
    var PriorityQueue = require('priorityqueuejs');
    var queue = new PriorityQueue(function(a, b) {
	  return a.cash - b.cash;
	});
	var Parse = require('parse').Parse;
	Parse.initialize("movT7QRzOiKtcjXzmU5z79EGWk5xqTnfDdv6lVRR", "XGqPpaAI8ZqJnMfUwu78VMJ2jVnCYe9puGMe2ISE");
	var TestObject = Parse.Object.extend("myUser");
	var query = new Parse.Query(TestObject);
	var query2 = new Parse.Query(TestObject);
    query.equalTo("fId", req.user.id);
    query.find({
      success: function(results) {
        query2.equalTo("interest",results[0]._serverData.team);
        //query2.ascending("experience");
        query2.find({
        	success: function(results2) {
        		//console.log(results);
        		for(var i = 0; i < results2.length; i++){
        			queue.enq({ cash: -1*Math.abs(parseInt(results2[i]._serverData.experience) + parseInt(results[0]._serverData.experience) - 10), name: results2[i]._serverData.name });
        		}
        		var people = [];
        		var temp;
        		while(queue.size() > 0){
        			temp = queue.deq();
        			temp.cash = Math.round((temp.cash+10)*(100/9));
        			people.push(temp);
        		}
        		//people = JSON.stringify(people);
        		//console.log(people);

				API.Groups.index(ACCESS_TOKEN, function(err,ret) {
			        if (!err) {
			            var names = [];
			            for (var i = 0; i < ret.length; i++) {
			              if(ret[i].name === req.query.hackathon){
			                  names = [ret[i].name, ret[i].id];
			              }
			            }
			            console.log(names[0], names[1]);
			            API.Groups.show(ACCESS_TOKEN, names[1], function(err,ret) {
			                console.log(ret);
			                res.render('hack', {pageData: {title: req.query.hackathon, groups: ret, bestMatch: people}});
			            });
			        }
			    });
        	}
        });
      },
    error: function(error) {
      console.log(error);
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

router.get('/findloc', function(req, res) {
    var key = 'AIzaSyBoA1LZose7Av4cU_MZzBVd2G4F1mbqb_g';
    var address = 'Princeton University'; //from website 
    address = escape(address);
    var geoLocationRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;

	var jsonObj = curl(geoLocationRequest, function(err) {
				    var jObj = JSON.parse(this.body);
				    console.log(jObj['results'][0].geometry.location);
				  });

	res.render('index', {pageData: {title: req.query.hackathon}});
});


module.exports = router;
