const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  profilePicture: String,
  walletAddress: { type: String, unique: true, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tokens: {
    erc20: [String],
    erc721: [String]
  }
});

module.exports = mongoose.model('User', userSchema);
