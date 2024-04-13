const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already exists.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({
            // Assume you collect other information such as firstName, lastName during signup
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin || false, // Ensure that you have proper controls over who can set this
            emailNotifications: req.body.emailNotifications || true,
            passport: req.body.passport
        });

        await user.save();

        // Include the isAdmin property in the token payload
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // Token is valid for 2 hours
        );
        
        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send('Error in Signup: ' + err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid Email or Password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid Email or Password.');

        // Include the isAdmin property in the token payload
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // Token is valid for 2 hours
        );

        // Send both token and isAdmin flag to the client
        res.send({ token, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).send('Error in Login: ' + err.message);
    }
});

module.exports = router;
