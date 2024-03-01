<template>
    <div>
        <nav class="navbar">
            <div class="nav-buttons">
                <button @click="connectWallet" class="btn">Connect Wallet</button>
                <button @click="$router.push('/requests')" class="btn">Requests</button>
                <button @click="$router.push('/')" class="btn">Profile</button>
            </div>
            <div class="search-container">
                <input v-model="searchAddress" type="text" placeholder="Search Address" name="searchAddress"
                    class="address-input" />
                <button @click="searchUser" class="btn">Search user</button>
            </div>
        </nav>

        <!-- Content with NFT image and text -->
        <div class="nft-container">
            <img src="@/components/nft.jpg" alt="NFT Image" class="nft-image" />
            <p class="nft-text">If you want an NFT, add 5 friends</p>
            <button @click="takeNFT" class="btn">Take NFT</button>
        </div>

        <!-- Rest of your content here -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'navbar',
    data() {
        return {
            name: "",
            bio: "",
            selectedFile: null,
            searchAddress: "",
            user: {}
        };
    },
    methods: {
        ...mapActions({
            connectWallet: "connectWallet",
            getUserProfile: "getUserProfile",
        }),
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async getUser() {
            console.log(this.$store.state.address)
            this.user = await this.getUserProfile([this.$store.state.address])
        },
        async searchUser() {
            this.$router.push(`/user/${this.searchAddress}`)
            this.searchAddress = ""
        },
        async takeNFT() {
    try {
        // Load Web3 instance
        const web3 = new Web3(window.ethereum);

        // Contract ABI
        const contractAbi = [
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
            // Add any other functions or events from your contract ABI if needed
        ];

        // Contract address
        const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

        // Contract instance
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Perform the minting operation
        const mintedTokenId = await contract.methods.mint(this.$store.state.address, 5).send({
            from: this.$store.state.address,
        });

        console.log("NFT minted with tokenId:", mintedTokenId);
    } catch (error) {
        console.error("Error taking NFT:", error);
    }
}

    },
};
</script>
<style scoped>
/* New styling for the page */

body {
    font-family: 'Roboto', sans-serif;
    background-color: #fafafa;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* New style for buttons */
.btn {
    background-color: black;
    /* Cyan color */
    color: #fff;
    border: none;
    padding: 12px 24px;
    /* Slightly smaller padding */
    margin: 8px;
    /* Slightly smaller margin */
    cursor: pointer;
    border-radius: 5px;
}
.nft-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.nft-image {
    max-width: 100%;
    max-height: 300px; /* Set a max height for the image */
    margin-bottom: 10px;
}

.nft-text {
    font-size: 18px;
    text-align: center;
    color: #333;
}
/* New style for input fields */
input,
textarea {
    width: 100%;
    padding: 12px;
    /* Slightly larger padding */
    margin: 8px 0;
    /* Slightly larger margin */
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

/* New style for the navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: black;
    /* Blue color */
}

/* New style for the address input in the navbar */
.address-input {
    flex: 1;
    margin-right: 10px;
}

/* New style for the navigation buttons in the navbar */
.nav-buttons {
    display: flex;
    gap: 12px;
    
}
</style>
