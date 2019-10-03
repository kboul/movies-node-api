const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use('/api/genres', genres);

const port = process.env.PORT || 3900;

app.listen(port, () => console.log(`Listening on port ${port}`));
