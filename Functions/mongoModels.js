const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  cakeDay: Date,
  followers: Array,
  name: String,
  id: String,
  posts: [{
    postId: String,
    date: Date,
    user: String,
    message: String,
    votes: {
      up: Number,
      down: Number,
    },
  }],
});

const usersSchema = mongoose.Schema({
  avatar: {
    body: {
      color: String,
    },
    eye: {
      color: String,
    },
  },
  mfa: {
    enabled: Boolean,
    secret: String,
  },
  cakeDay: Date,
  coins: Number,
  followers: Array,
  following: Array,
  id: String,
  karma: Number,
  password: String,
  premium: {
    isPremium: Boolean,
    date: Date,
  },
  roles: [String],
  comments: [{
    postId: String,
    date: Date,
    message: String,
    votes: {
      up: Number,
      down: Number,
    },
  }],
  username: String,
});

module.exports = {
  users: mongoose.model('users', usersSchema),
  boards: mongoose.model('boards', boardSchema),
};
