const express = require('express');
const app = express();
const genres = require('./routes/genres');

// enable parsing of JSON objects
// in the body of the request by
// adding a piece of middleware...
app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3900;

app.listen(port, () => console.log(`Listening on port ${port}`));
