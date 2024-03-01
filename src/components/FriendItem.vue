<template>
    <div class="friend-card">
        <img @click="searchUser" :src="this.user.image" alt="No Image" class="rounded-circle" width="100" />
        <div @click="searchUser" class="friend-details">
            <h3>Username: {{ this.user.name }}</h3>
        </div>
        <button class="btn" @click="remove">Delete from friends</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'friend-item',
    data() {
        return {
            user: {}
        };
    },
    props: {
        userAddress: {
            type: String,
            required: true,
        },
    },
    methods: {
        ...mapActions({
            getUserProfile: "getUserProfile",
            acceptFriendRequest: "acceptFriendRequest",
            declineFriendRequest: "declineFriendRequest",
            removeFriend: "removeFriend"
        }),
        async getUser() {
            console.log(this.userAddress)
            this.user = await this.getUserProfile([this.userAddress])
            console.log(this.user)
        },
        async searchUser() {
            this.$router.push(`/user/${this.userAddress}`)
            this.searchAddress = ""
        },
        async remove() {
            await this.removeFriend([this.userAddress])
        }
    },
    async mounted() {
        this.getUser()
    },
    watch: {
        'this.userAddress': 'getUser'
    }
}
</script>

<style>
.friend-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.friend-card img {
    max-width: 80px;
    /* Reduced image width */
    border-radius: 50%;
}

.friend-details {
    text-align: center;
    margin-top: 10px;
}

.friend-details h3 {
    margin: 0;
}

.friend-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #777;
}

.btn {
    background-color: #ff5555;
    /* Reddish color */
    color: #fff;
    border: none;
    padding: 15px 30px;
    /* Larger padding */
    margin: 10px;
    /* Larger margin */
    cursor: pointer;
    border-radius: 8px;
    /* Rounded corners */
}
</style>