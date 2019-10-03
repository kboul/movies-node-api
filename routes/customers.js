const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const validateCustomer = require('../validators/validateCustomer');

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

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        res.status(404).send(
            `The customer with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
        {
            new: true
        }
    );

    if (!customer) {
        res.status(404).send(
            `The customer with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        res.status(404).send(
            `The customer with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(customer);
});

module.exports = router;
