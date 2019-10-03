const express = require('express');
const router = express.Router();
const validateGenre = require('../utils/validateGenre.js');

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

router.get('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const genre = genres.find(c => c.id === parseInt(id));

    if (!genre) {
        res.status(404).send(`The genre with the id ${id} was not found`);
        return;
    }

    res.send(genre);
});

router.put('/:id', (req, res) => {
    const {
        params: { id },
        body: { name }
    } = req;

    const genre = genres.find(c => c.id === parseInt(id));
    if (!genre) {
        res.status(404).send(`The genre with the id ${id} was not found`);
        return;
    }

    const { error } = validateGenre(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // update genre
    genre.name = name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const {
        params: { id }
    } = req;

    const genre = genres.find(c => c.id === parseInt(id));
    if (!genre) {
        res.status(404).send(`The genre with the id ${id} was not found`);
        return;
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

module.exports = router;
