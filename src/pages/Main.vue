<template>
    <div class="container">
        <div class="main-body">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <img :src="userImageSrc" alt="Pinata Image" class="rounded-circle" width="150" />
                        <div class="mt-3">
                            <h4>Wallet Address: {{ $store.state.address }}</h4>
                            <h4>Username: {{ this.user.name }}</h4>

                            <div v-if="hasNFT">
                                <a href="https://mumbai.polygonscan.com/address/0xDbB0e637bcEaE22EC53890BBAF213a3a46Cb8c80">
                                    <img class="rounded-circle nft-image" src="/home/iliias/Linkedin/Linkedin/src/image/nft.jpg" alt="NFT Image">
                                </a>
                                <p>Congratulations! You have an NFT.</p>
                            </div>
                            <div v-else>
                                <div v-if="friends.length >= 5">
                                    <button @click="getNFT" class="btn">Get NFT</button>
                                </div>
                            </div>
                            <div class="mt-3 button-container">
                                <button @click="refresh" class="btn">Refresh</button>
                                <button @click="toggleNameForm" class="btn">Change Name</button>
                                <button @click="toggleBioForm" class="btn">Change Bio</button>
                                <button @click="toggleImageForm" class="btn">Change Image</button>
                            </div>
                            <div v-if="showNameForm" class="form-container">
                                <input v-model="name" type="text" placeholder="Name" name="first_name" required />
                                <button @click="updateName" class="btn">Update Name</button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h4>User BIO: {{ this.user.bio || 'Empty    ' }}</h4>
                            <button @click="toggleBioForm" class="btn">Change Bio</button>
                            <button @click="toggleImageForm" class="btn">Change Image</button>

                            <div v-if="showBioForm" class="form-container">
                                <textarea v-model="bio" placeholder="Bio" name="bio" rows="4"></textarea>
                                <button @click="updateBio" class="btn">Update BIO</button>
                            </div>

                            <div v-if="showImageForm" class="form-container">
                                <div class="input-field">
                                    <i class="fas fa-file"></i>
                                    <input type="file" @change="handleFileChange" accept=".jpg, .jpeg, .png" required />
                                </div>
                                <button @click="updatePicture" class="btn-blue">Add Picture</button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h1>Friends</h1>
                            <div v-for="address in friends" :key="address">
                                <friend-item :userAddress="address" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            friends: [],
            showNameForm: false,
            showBioForm: false,
            showImageForm: false,
            hasNFT: false
        };
    },
    computed: {
        userImageSrc() {
            return this.user.image ? this.user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
        },
    },
    methods: {
        ...mapActions({
            connectWallet: "connectWallet",
            getUserProfile: "getUserProfile",
            updateProfileName: "updateProfileName",
            updateProfileBio: "updateProfileBio",
            updateProfilePicture: "updateProfilePicture",
            uploadFileToPinata: "uploadFileToPinata",
            getImageFromPinata: "getImageFromPinata",
            getTOPWEB3: "getTOPWEB3",
            getBalanceNFT: "getBalanceNFT"
        }),
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async updateName() {
            await this.updateProfileName([this.name])
        },
        async updateBio() {
            await this.updateProfileBio([this.bio])
        },
        async updatePicture() {
            console.log(this.selectedFile)
            const ipfsHash = await this.uploadFileToPinata([this.selectedFile])
            await this.updateProfilePicture([ipfsHash])
        },
        async getUser() {
            console.log(this.$store.state.address)
            this.user = await this.getUserProfile([this.$store.state.address])
            this.friends = this.user.friends
            console.log(this.friends)
        },
        toggleNameForm() {
            this.showNameForm = !this.showNameForm;
        },
        toggleBioForm() {
            this.showBioForm = !this.showBioForm;
        },
        toggleImageForm() {
            this.showImageForm = !this.showImageForm;
        },
        async getNFT() {
            await this.getTOPWEB3([this.$store.state.address, this.friends.length])
            this.hasNFT = true
        },
        async getBalance() {
            this.hasNFT = await this.getBalanceNFT([this.$store.state.address])
            console.log(this.hasNFT)
        },
        async refresh() {
            await this.getBalance()
            await this.getUser()
        }
    },
};
</script>

<style scoped>
/* New styling for the page */
body {
    font-family: 'Helvetica', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.mt-3 {
    margin-top: 20px;
    padding: 15px;
    background-color: lightslategray;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.mt-3 h4 {
    margin: 10px 0;
    font-size: 18px;
    color: #333;
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
    border: 2px solid #333; /* Add a border with your desired color */
}

/* Style for the NFT image */
.nft-image {
    border: 3px solid #4285f4; /* Google Blue color */
    border-radius: 10px; /* Slightly rounded corners */
    margin-top: 12px; /* Adjust margin-top as needed */
    display: block;
    margin-left: auto;
    margin-right: auto;
}


/* New style for buttons */
.btn {

    background-color:black;
    /* Google Blue color */
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
.button-container {
    display: flex;
    justify-content: space-around; /* Adjust as needed */
    margin-top: 12px; /* Add margin-top as needed */
}

/* New style for buttons inside the container */
.button-container .btn {
    flex: 1; /* Distribute space equally among buttons */
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

/* Style for the NFT image */
.nft-image {
    border: 3px solid #4285f4; /* Google Blue color */
    border-radius: 10px; /* Slightly rounded corners */
    margin-top: 12px; /* Adjust margin-top as needed */
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
    color: #4285f4;
    /* Google Blue color */
}

/* New style for the file input */
.input-field input[type="file"] {
    padding-left: 35px;
    /* Slightly smaller padding-left */
}
#h4{

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
