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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin || false,
            emailNotifications: req.body.emailNotifications || true,
            passport: req.body.passport
        });

        await user.save();

        const token = jwt.sign(
            { 
                _id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                passport: user.passport, //REMOVE this in case authentication breaks > Used dashboard
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
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

        const token = jwt.sign(
            { 
                _id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                passport: user.passport, //REMOVE this in case authentication breaks > User dashboard
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.send({ token });
    } catch (err) {
        res.status(500).send('Error in Login: ' + err.message);
    }
});

module.exports = router;
