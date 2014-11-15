var express = require('express');
var router = express.Router();

var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient('e4a7466d2f67dfb1045c8d60e7efc1');

hipchat.api.rooms.create({
  name: room_id,
  owner_user_id: user_id
}, function (err, res) {
  if (err) { throw err; }
  console.log(res);
});