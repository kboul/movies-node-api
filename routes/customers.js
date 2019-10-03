const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateCustomer = require('../validators/validateCustomer');

const Customer = mongoose.model(
    'Customer',
    new mongoose.Schema({
        isGold: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        }
    })
);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});

module.exports = router;
