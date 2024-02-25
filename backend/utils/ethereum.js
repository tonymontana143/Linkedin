const { ethers } = require('ethers');


// Инициализация провайдера Ethereum
// const provider = new ethers.providers.JsonRpcProvider();


// Смарт-контракт NFT (замените на ваш контракт)
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = 1;// Вставьте ABI вашего контракта

// Функция для получения баланса NFT
async function getNFTBalance(walletAddress) {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance.toString();
}

// Функция для майнинга NFT
async function mintNFT(walletAddress) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contractWithSigner.mint(walletAddress);
    await tx.wait();
    return tx.hash;
}

module.exports = { getNFTBalance, mintNFT };
