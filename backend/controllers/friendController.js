const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend.friendRequests.includes(userId)) {
      await User.findByIdAndUpdate(friendId, { $push: { friendRequests: userId } });
      res.status(200).json({ message: "Friend request sent." });
    } else {
      res.status(400).json({ message: "Friend request already sent." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
      $pull: { friendRequests: friendId }
    });
    await User.findByIdAndUpdate(friendId, {
      $push: { friends: userId }
    });
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
