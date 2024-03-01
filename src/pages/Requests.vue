<template>
    <div>
        <h2>Pending Friend Requests</h2>
        <button @click="getRequests" class="btn">Refresh</button>
        <div v-for="address in requests" :key="address">
            <request-item :userAddress="address"/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'MainView',
    data() {
        return {
            name: "",
            bio: "",
            selectedFile: null,
            user: {},
            requests: []
        };
    },
    methods: {
        ...mapActions({
            getincomingFriendRequests: "getincomingFriendRequests"
        }),
        async getRequests(){
            console.log(this.$store.state.address)
            this.requests = await this.getincomingFriendRequests([this.$store.state.address])
            console.log(this.requests)
        }
    },
    async mounted() {
        this.getRequests()
    },
    watch: {
        'this.requests': 'getRequests'
    }
};
//алия лучшая
</script>

<style scoped>
/* New styling for the page */
body {
    font-family: 'Montserrat', sans-serif;
    background-color: #f9f9f9;
    color: #555;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* New style for buttons */
.btn {
    background-color: #4caf50;
    /* Green color */
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 5px;
}

/* New style for input fields */
input,
textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

/* New style for the image */
img {
    max-width: 120px;
    /* Slightly smaller maximum width */
    height: auto;
    border-radius: 5px;
    margin-top: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* New style for the input field with the file icon */
.input-field {
    position: relative;
    margin: 10px 0;
}

.input-field i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #4caf50;
    /* Green color */
}

/* New style for the file input */
.input-field input[type="file"] {
    padding-left: 30px;
}

/* New style for the container of the search input and button */
.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    /* Optional: Add margin for separation from other elements */
}

/* New adjustment for the styles for the address input to fit in the same line */
.address-input {
    flex: 1;
    /* Allow the input to take up available space */
    margin-right: 10px;
    /* Optional: Add margin between input and button */
}
</style>
