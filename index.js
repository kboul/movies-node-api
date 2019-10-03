const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect('mongodb://localhost/movies-db', options)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// enable parsing of JSON objects
app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3900;

app.listen(port, () => console.log(`Listening on port ${port}`));
