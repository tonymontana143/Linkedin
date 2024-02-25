const User = require('../models/User');
const { getNFTBalance, mintNFT } = require('../utils/ethereum');


// Подключение кошелька и проверка баланса NFT
exports.connectWallet = async (req, res) => {
    const { walletAddress } = req.body;
    try {
        let user = await User.findOne({ walletAddress });
        if (!user) {
            user = await User.create({ walletAddress });
        }
        // Получение баланса NFT и отправка данных пользователя вместе с балансом
        const nftBalance = await getNFTBalance(walletAddress);
        res.status(200).json({ user, nftBalance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Майнинг NFT для пользователя (вы можете вызвать эту функцию в соответствии с вашей бизнес-логикой)
exports.mintNFTForUser = async (req, res) => {
    const { walletAddress } = req.body;
    try {
        const txHash = await mintNFT(walletAddress);
        res.status(200).json({ message: `NFT minted successfully with transaction hash: ${txHash}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.connectWallet = async (req, res) => {
  const { walletAddress } = req.body;
  try {
    let user = await User.findOne({ walletAddress });
    if (!user) {
      user = await User.create({ walletAddress });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
