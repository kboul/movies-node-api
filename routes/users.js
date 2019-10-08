const express = require('express');
const router = express.Router();
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

    const { name, password, email } = req.body;
    user = new User({
        name,
        email,
        password
    });

    user = await user.save();
    res.send({
        name,
        email
    });
});

module.exports = router;
