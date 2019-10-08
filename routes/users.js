const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validateUser = require('../validators/validateUser');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // check if user is already registered
    let user = await User.findOne({
        email: req.body.email
    });

    if (user) {
        res.status(400).send('User already registered');
        return;
    }

    const userWithoutEmail = {
        name: req.body.name,
        email: req.body.email
    };

    user = new User({
        ...userWithoutEmail,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send(userWithoutEmail);
});

module.exports = router;
