
<template>
    <div class="user-container">
        <div class="user-details">
            <h1>User Address: {{ this.user.address }}</h1>
            <h1>Username: {{ this.user.name }}</h1>
            <h1>User BIO: {{ this.user.bio || 'No BIO yet' }}</h1>
        </div>
        
        <div class="user-actions">
            <button @click="getUser" class="btn">Refresh</button>
            <div v-if="isFriend">
                <button @click="sendRequest" :disabled="buttonDisabled" class="btn">{{ buttonText }}</button>
            </div>
            
            <!-- New Section for NFT Image and Text -->
            <div class="nft-section">
                <img src="@/components/nft.jpg" alt="NFT Image" class="nft-image" />
                <p class="nft-text">If you want NFT, add 5 friends</p>
                <button @click="addFriend" class="btn">Add Friend</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "user-item",
    data() {
        return {
            user: {},
            hasWatched: false,
            buttonText: "Send Friend Request",
            isFriend: false,
            buttonDisabled: false
        }
    },
    props: {
        userAddress: {
            type: String,
            require: true
        }
    },
    methods: {
        ...mapActions({
            getUserProfile: 'getUserProfile',
            connectWallet: "connectWallet",
            sendFriendRequest: "sendFriendRequest"
        }),
        async getUser() {
            console.log(this.userAddress)
            this.user = await this.getUserProfile([this.userAddress])
            console.log(this.user.friends.includes(this.$store.state.address))
            if(!this.user.friends.includes(this.$store.state.address)){
                this.isFriend = true
            }
            else{
                this.isFriend = false
            }
            console.log(this.user)
        },
        async sendRequest(){
            await this.sendFriendRequest(this.userAddress)
            this.buttonText = "Sent request"
            this.buttonDisabled = true
        }
    },
    watch: {
        '$route.params.searchAddress': 'getUser'
    },
    async mounted() {
        this.getUser()
    }
}
</script>

<style>
/* New styling for the user-item */
.user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:red;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 15px;
}

/* New style for user-details */
.user-details {
    text-align: center;
    margin-bottom: 20px;
}

.user-details h1 {
    margin: 10px 0;
    color: #333333;
}

/* New style for user-image */
.user-image img {
    max-width: 200px;
    
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* New style for user-actions */
.user-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-actions h1 {
    margin-top: 15px;
    color: #333333;
}

/* New style for buttons */
.btn {
    background-color: black;
    color: #ffffff;
    border: none;
    padding: 12px 25px;
    margin: 10px 5px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

/* Hover effect for buttons */
.btn:hover {
    background-color: black;
}
/* Add these styles to your existing styles or create a new style section */

/* New style for NFT Section */
.nft-section {
    text-align: center;
    margin-top: 20px;
}

/* New style for NFT Image */
.nft-image {
    max-width: 100px; /* Adjust as needed */
    border-radius: 8px;
}

/* New style for NFT Text */
.nft-text {
    color: #ffffff;
    margin-top: 10px;
}
/* Add these styles to your existing styles or create a new style section */

/* New style for NFT Section */
.nft-section {
    text-align: center;
    margin-top: 20px;
}

/* New style for NFT Image */
.nft-image {
    max-width: 100px; /* Adjust as needed */
    border-radius: 8px;
}

/* New style for NFT Text */
.nft-text {
    color: #ffffff;
    margin-top: 10px;
}


</style>
