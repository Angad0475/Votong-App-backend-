const express = require('express');
const User = require('../models/User'); // Import your Mongoose User model
const router = express.Router();

// Route to create a new user
router.post('/add', async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new user object from the request body
        await newUser.save(); // Save the user object to MongoDB
        res.status(201).send(newUser); // Send a success response with the new user data
    } catch (error) {
        res.status(400).send(error); // Send an error response if saving fails
    }
});

module.exports = router;
