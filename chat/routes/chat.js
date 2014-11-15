var express = require('express');
var router = express.Router();

var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient('e4a7466d2f67dfb1045c8d60e7efc1');

router.get('/chat', function(req, res) {
  res.render('index', { pageData: {title: 'HackerChat'}});
});


hipchat.api.rooms.message({
  room_id: 'Frontend',
  from: 'HipChat Client',
  message: 'Hello world!'
}, function (err, res) {
  if (err) { throw err; }
  console.log(res);
});

if (create) {
	redirect_to
}
else if (modify) {

}
else {
	console.log('This is an Error...');
}