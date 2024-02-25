const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/sendRequest', friendController.sendFriendRequest);
router.post('/acceptRequest', friendController.acceptFriendRequest);

module.exports = router;
