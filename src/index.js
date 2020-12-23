const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/books', require('../routes/books'));

app.use('/api/book', require('../routes/book'));

app.use('*', require('../routes/error'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});