<template>
    <div class="request-item-container">
        <div class="profile-picture">
            <img v-if="this.user.image" :src="this.user.image" alt="Pinata Image" />
            <div v-else>
                <p>No profile picture yet</p>
            </div>
        </div>
        <div class="user-details">
            <h1>Address: {{ this.userAddress }}</h1>
            <h1>Username: {{ this.user.name }}</h1>
            <div class="buttons-container">
                <button @click="accept" class="btn accept-btn">Accept Request</button>
                <button @click="decline" class="btn decline-btn">Decline Request</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'request-item',
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
            declineFriendRequest: "declineFriendRequest"
        }),
        async getUser() {
            console.log(this.userAddress)
            this.user = await this.getUserProfile([this.userAddress])
            console.log(this.user)
        },
        async accept(){
            await this.acceptFriendRequest([this.userAddress])
        },
        async decline(){
            await this.declineFriendRequest([this.userAddress])
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
/* New styling for the request-item */
.request-item-container {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

/* New style for the profile picture */
.profile-picture {
    margin-right: 15px;
}

.profile-picture img {
    max-width: 80px;
    border-radius: 50%;
}

/* New style for the user details */
.user-details h1 {
    margin: 8px 0;
    color: #333;
}

/* New style for the buttons container */
.buttons-container {
    display: flex;
    gap: 8px;
}

/* New style for the accept button */
.accept-btn {
    background-color: #3f51b5;
}

/* New style for the decline button */
.decline-btn {
    background-color: #e53935;
}

/* New style for the common button styles */
.btn {
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

/* Hover effect for buttons */
.btn:hover {
    opacity: 0.9;
}

</style>
