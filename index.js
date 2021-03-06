const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
const cors = require('cors');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');

// ensure jwtPrivateKey is defined
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1); // exit the process
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect('mongodb://localhost/movies-db', options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

mongoose.set('useCreateIndex', true);

// enable parsing of JSON objects
app.use(express.json());

// CORS for react app, assuming port 3000
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3900;

app.listen(port, () => console.log(`Listening on port ${port}`));
