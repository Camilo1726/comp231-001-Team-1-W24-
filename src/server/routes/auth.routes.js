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
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
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

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (err) {
        res.status(500).send('Error in Login: ' + err.message);
    }
});

module.exports = router;
