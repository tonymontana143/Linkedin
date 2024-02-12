const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://iliaskenes2005:9Rd3J4N3ycJ5n4tg@cluster0.l7ef1nq.mongodb.net/?retryWrites=true&w=majority'
        );
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();