import { createStore } from 'vuex'
import { ABI } from "@/contracts/Web3Linkedin.abi.js"
import { bytecode } from "@/contracts/Web3Linkedin.bin.js"
import { NFTABI } from '@/contracts/MERC721.abi';
import { NFTbytecode } from '@/contracts/MERC721.bin';
const FormData = require('form-data');

const axios = require("axios");
const formData = new FormData();

const PinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYzBhNzJiNy1hYTM3LTQ3ZDAtODU2ZC0xNTYzNmYwMDk4MTMiLCJlbWFpbCI6InJtaXQyNUBtYWlsLnJ1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQ0MTg3MWIwYjM3MmIyZTEyMjJmIiwic2NvcGVkS2V5U2VjcmV0IjoiZTMzYmVkZTA4ODM4MTFjYTJlOGJlNzc4YzFjNGFiNDljNzEwNmU5MWQxYzAxNGNhMGU5NjE1ZGE0Y2JmMGRiMiIsImlhdCI6MTcwOTIzNjgzN30.MfhHRo-ij8SOFeBfwYIyyS2i4ZUBRvxB_G4vnGQIjAE";
const ethers = require('ethers')
let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/wusrTgSFSsScFKTK6Nqa5rFoisfYXjPW")

export default createStore({
    state: {
        address: "",
        chainId: "",
        chain: "",
        deployHash: "",
        contractAddress: "0xf8e81D47203A594245E36C48e151709F0C19fBe8",
        isConnected: false,
        username: "",
        userBio: "",
        userProfilePicture: "",
        contest: {},
        ipfsHash: "",
        pinataImageUrl: ""
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async connectWallet({ state }) {
            // проверяем, что есть метамаск и подключаем его
            if (typeof window.ethereum !== 'undefined') {
                console.log("Ethereum client installed!")
                if (ethereum.isMetaMask === true) {
                    console.log("Metamask installed!")
                    if (ethereum.isConnected() !== true) {
                        console.log("Metamask is not connected!")
                        await ethereum.enable()
                        state.isConnected = true;
                        state.buttonText = 'Connected';
                    }
                    console.log("Metamask connected!")
                    state.isConnected = true;
                    state.buttonText = 'Connected';
                }
                else {
                    alert("Metamask is not installed!")
                }
            }
            else {
                alert("Ethereum client is not installed!")
            }

            ethereum.on('disconnect', () => {
                state.isConnected = false;
                state.buttonText = 'Connect MetaMask';
            });
            // создаём провайдера
            provider = new ethers.providers.Web3Provider(ethereum)

            // подключаем аккаунт
            await ethereum.request({ method: "eth_requestAccounts" })
                .then(accounts => {
                    state.address = ethers.utils.getAddress(accounts[0])
                    state.signer = provider.getSigner()
                    console.log(`Account ${state.address} connected`)
                    alert("Connected!")
                })
            // получаем параметры сети 
            state.chainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log("chainId: ", state.chainId)
            if (state.chainId == "0x1") {
                state.chain = "mainnet"
            }
            else if (state.chainId == "0x5") {
                state.chain = "goerli"
                provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/TS8hjejOOd_2UNj46exSTVtqS7-JxYrT")
                state.contest = new ethers.Contract(state.contractAddress, ABI, provider)
            }
            else if (state.chainId == "0x539") {
                state.chain = "ganache"
                provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
                state.contest = new ethers.Contract(state.contractAddress, ABI, provider)
            }
            else if (state.chainId == "0x13881") {
                state.chain = "mumbai"
                provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/wusrTgSFSsScFKTK6Nqa5rFoisfYXjPW")
                state.contest = new ethers.Contract(state.contractAddress, ABI, provider)
            }
            else if (state.chainId == "0xaa36a7") {
                state.chain = "sepolia"
                provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/UqJsOz1IQnRrGqV9bh7Q7ziNR2rN7Pi7")
                state.contest = new ethers.Contract(state.contractAddress, ABI, provider)
            }

            ethereum.on('accountsChanged', (accounts) => {
                state.address = ethers.utils.getAddress(accounts[0])
                state.signer = provider.getSigner()
                console.log(`accounts changed to ${state.address}`)
            })

            ethereum.on('chainChanged', async (chainId) => {
                // создаём провайдера
                provider = new ethers.providers.Web3Provider(ethereum)
                // получаем параметры сети 
                state.chainId = await window.ethereum.request({ method: 'eth_chainId' });
                console.log(`chainId changed to ${state.chainId}`)

                if (state.chainId == "0x1") {
                    state.chain = "mainnet"
                    alert(`chain changed to ${state.chain}`)
                }
                else if (state.chainId == "0x5") {
                    state.chain = "goerli"
                    provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/TS8hjejOOd_2UNj46exSTVtqS7-JxYrT")
                    alert(`chain changed to ${state.chain}`)

                }
                else if (state.chainId == "0x539") {
                    state.chain = "ganache"
                    provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
                    alert(`chain changed to ${state.chain}`)

                }
                else if (state.chainId == "0x13881") {
                    state.chain = "mumbai"
                    provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/wusrTgSFSsScFKTK6Nqa5rFoisfYXjPW")
                    alert(`chain changed to ${state.chain}`)
                }
                else if (state.chainId == "0xaa36a7") {
                    state.chain = "sepolia"
                    provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/UqJsOz1IQnRrGqV9bh7Q7ziNR2rN7Pi7")
                    alert(`chain changed to ${state.chain}`)
                }
            })
        },
        async uploadFileToPinata({ state }, args) {
            try {
                const [file] = args
                console.log(file)

                formData.append('file', file);
                console.log(formData)

                const pinataMetadata = {
                    name: "File name",
                };
                formData.append("pinataMetadata", JSON.stringify(pinataMetadata));
                console.log(formData)


                const pinataOptions = {
                    cidVersion: 1,
                };

                formData.append("pinataOptions", JSON.stringify(pinataOptions));
                console.log(formData)


                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        'pinata_api_key': "d41871b0b372b2e1222f",
                        'pinata_secret_api_key': "e33bede0883811ca2e8be778c1c4ab49c7106e91d1c014ca0e9615da4cbf0db2",
                    },
                });

                console.log(res)
                state.ipfsHash = res.data.IpfsHash
                return res.data.IpfsHash
            } catch (error) {
                console.error("Error uploading file to Pinata:", error);
                throw error;
            }
        },
        async getImageFromPinata({ state }, hash) {
            try {
                const url = `https://fuchsia-rare-bear-134.mypinata.cloud/ipfs/${hash}`
                return url
            } catch (error) {
                console.error('Error fetching image from Pinata:', error);
            }
        },
        async registerProfile({ state }, args) {
            const [name] = args

            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("registerProfile", [name])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Registered succesfully!")
        },
        async updateProfileName({ state }, args) {
            const [newName] = args
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("updateProfileName", [newName])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Name changed succesfully!")

        },
        async updateProfileBio({ state }, args) {
            const [newBio] = args
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("updateProfileBio", [newBio])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("BIO changed succesfully!")

        },
        async updateProfilePicture({ dispatch, state }, args) {
            const [ipfsHash] = args

            try {

                const iContract = new ethers.utils.Interface(ABI);
                const data = iContract.encodeFunctionData('updateProfilePicture', [ipfsHash]);

                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: state.address,
                        to: state.contractAddress,
                        data: data,
                    }],
                });

                console.log(`Tx hash: ${txHash}`);
                console.log('Picture changed successfully!');
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        },
        async getUserProfile({ state, dispatch }, address) {
            console.log(address)
            console.log("Store")
            const [username, userBio, userProfilePicture, userFriends] = await state.contest.getUserProfile(address[0])
            console.log(userProfilePicture)
            let url = await dispatch("getImageFromPinata", userProfilePicture)
            if (url === "https://fuchsia-rare-bear-134.mypinata.cloud/ipfs/") {
                url = "'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'"
            }
            else {
                url = await dispatch("getImageFromPinata", userProfilePicture)
            }
            const user = {
                address: address[0],
                name: username,
                bio: userBio,
                image: url,
                friends: userFriends
            }
            return (user)
        },
        async sendFriendRequest({ state, dispatch }, address) {
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("sendFriendRequest", [address])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Friend request sent succesfully!")
        },
        async getFriendRequests({ state }, address) {
            let friendRequests = []
            friendRequests = await state.contest.getFriendRequests(address[0])
            console.log(friendRequests)
            return friendRequests
        },
        async getincomingFriendRequests({ state }, address) {
            console.log(address)
            let incomingFriendRequests = []
            incomingFriendRequests = await state.contest.getincomingFriendRequests(address[0])
            console.log(incomingFriendRequests)
            return incomingFriendRequests
        },
        async acceptFriendRequest({ state, dispatch }, address) {
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("acceptFriendRequest", [address[0]])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Friend accepted succesfully!")
        },
        async declineFriendRequest({ state, dispatch }, address) {
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("declineFriendRequest", [address[0]])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Friend declined succesfully!")
        },
        async removeFriend({ state, dispatch }, address) {
            const iContract = new ethers.utils.Interface(ABI)
            const data = iContract.encodeFunctionData("removeFriend", [address[0]])

            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: state.address,
                    to: state.contractAddress,
                    data: data
                }]
            })
            console.log(`Tx hash: ${txHash}`)

            console.log("Friend removed succesfully!")
        },
        async getTOPWEB3({ state }, args) {
            const [address, friends] = args

            const privateKey = "fd487565fd2e65acc3467ae53c1aa6920763a602f3b44fb944b95f7286f57cd2"
            const wallet = new ethers.Wallet(privateKey, provider);
            const contract = new ethers.Contract("0xDbB0e637bcEaE22EC53890BBAF213a3a46Cb8c80", NFTABI, wallet);

            const data = contract.interface.encodeFunctionData("mint", [address, friends])

            const tx = await wallet.sendTransaction({
                to: "0xDbB0e637bcEaE22EC53890BBAF213a3a46Cb8c80",
                data: data,
            });

            const receipt = await tx.wait();
            console.log("Transaction mined:", receipt.transactionHash);

            console.log("NFT Minted succesfully!")
        },
        async getBalanceNFT({ state }, args) {
            console.log(args)
            const contract = new ethers.Contract("0xDbB0e637bcEaE22EC53890BBAF213a3a46Cb8c80", NFTABI, provider);
            console.log(contract)
            const balance = await contract.balanceOf(args[0])
            console.log(balance)
            if (balance == 0) {
                return false
            }
            else {
                return true
            }
        }
    },
    modules: {
    }
})
