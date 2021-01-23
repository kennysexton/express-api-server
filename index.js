const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
app.use('/users', require('./routes/users'));

app.get('/', (_, res) => {
    res.send('Sport Bracket Maker API endpoint');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to DB!")
    })

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));