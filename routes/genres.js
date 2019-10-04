const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const validateGenre = require('../validators/validateGenre');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        res.status(404).send(
            `The genre with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name }, // update object
        {
            new: true // options object to get the updated object from the DB
        }
    );

    if (!genre) {
        res.status(404).send(
            `The genre with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        res.status(404).send(
            `The genre with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(genre);
});

module.exports = router;
