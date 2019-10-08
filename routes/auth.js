const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateAuth = require('../validators/validateAuth');

router.post('/', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // check if user is already registered
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        res.status(400).send('Invalid email or password');
        return;
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword) {
        res.status(400).send('Invalid email or password');
        return;
    }

    const token = jwt.sign(
        {
            _id: user._id
        },
        'jwtPrivateKey'
    );

    res.send(token);
});

module.exports = router;
