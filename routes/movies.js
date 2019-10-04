const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const { Genre } = require('../models/genre');
const validateMovie = require('../validators/validateMovie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        // Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // find the genre which has the passed id
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        res.status(400).send('Invalid genre');
        return;
    }

    let movie = new Movie({
        title: req.body.title,
        genre: {
            id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).send(
            `The movie with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        res.status(400).send('Invalid genre.');
        return;
    }

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true }
    );

    if (!movie) {
        res.status(404).send('The movie with the given ID was not found.');
        return;
    }

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) {
        res.status(404).send(
            `The movie with the id ${req.params.id} was not found`
        );
        return;
    }

    res.send(movie);
});

module.exports = router;
