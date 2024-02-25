const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Регистрация пользователя
router.post('/register', userController.register);

// Подключение кошелька пользователя
router.post('/connectWallet', userController.connectWallet);

// Майнинг NFT для пользователя
router.post('/mintNFT', userController.mintNFTForUser);

module.exports = router;
