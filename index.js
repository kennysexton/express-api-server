const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Possible CORS fix
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Import routes
app.use('/users', require('./routes/users'));
app.use('/results', require('./routes/results'));

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