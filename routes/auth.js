const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
    let user = await User.findOne({
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

    res.send(true);
});

module.exports = router;
