const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
