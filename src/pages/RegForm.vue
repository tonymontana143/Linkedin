<template>
    <div class="forms-container">
        <div class="signin-signup">
            <form @submit.prevent="submitForm">
                <h2 class="title">Sign up</h2>
                <div class="input-field">
                    <i class="fas fa-user"></i>
                    <input v-model="name" type="text" placeholder="Name" name="first_name" required />
                </div>
                <!-- <div class="input-field">
                    <i class="fas fa-file"></i> 
                    <input type="file" @change="handleFileChange" accept=".jpg, .jpeg, .png" required />
                </div> -->
                <button @click="connectWallet" class="btn">Connect Metamask</button>
                <h3>Your address</h3>
                <p>{{ $store.state.address }}</p>
                <input type="submit" class="btn" value="Sign up" />
            </form>
        </div>
    </div>
</template>
	
<script>
import { mapActions } from 'vuex'
export default {
    name: 'RegFormView',
    data() {
        return {
            // selectedFile: null, 
            name : ""
        };
    },
    methods: {
        ...mapActions({
            connectWallet: "connectWallet",
            registerProfile: "registerProfile"
        }),
        async submitForm() {
            try {
                await this.registerProfile([this.name]);
                this.$router.push('/')
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
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
    background-color: #ff9800;
    /* Orange color */
    color: #fff;
    border: none;
    padding: 12px 25px;
    /* Slightly smaller padding */
    margin: 8px;
    /* Slightly smaller margin */
    cursor: pointer;
    border-radius: 5px;
    /* Slightly rounded corners */
}

/* New style for input fields */
input,
textarea {
    width: 100%;
    padding: 12px;
    /* Slightly smaller padding */
    margin: 8px 0;
    /* Slightly smaller margin */
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
    /* Slightly rounded corners */
    font-size: 16px;
    /* Slightly smaller font size */
}

/* New style for the image */
img {
    max-width: 120px;
    /* Slightly smaller max-width */
    height: auto;
    border-radius: 5px;
    /* Slightly rounded corners */
    margin-top: 12px;
    /* Slightly smaller margin-top */
    display: block;
    margin-left: auto;
    margin-right: auto;
}

/* New style for the input field with the file icon */
.input-field {
    position: relative;
    margin: 12px 0;
    /* Slightly smaller margin */
}

.input-field i {
    position: absolute;
    top: 50%;
    left: 10px;
    /* Slightly smaller left position */
    transform: translateY(-50%);
    color: #ff9800;
    /* Orange color */
}

/* New style for the file input */
.input-field input[type="file"] {
    padding-left: 35px;
    /* Slightly smaller padding-left */
}

/* New style for the container of the search input and button */
.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    /* Slightly smaller margin-bottom */
}

/* New adjustment for the styles for the address input to fit in the same line */
.address-input {
    flex: 1;
    margin-right: 10px;
    /* Slightly smaller margin-right */
}
</style>
