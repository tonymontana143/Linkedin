const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { userId, content } = req.body;
  try {
    const post = await Post.create({ author: userId, content });
    res.status(201).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
