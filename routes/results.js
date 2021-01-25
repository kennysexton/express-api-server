const express = require('express');
const router = express.Router();
const Result = require('../models/Result')
require('dotenv/config');


// Get result
router.get('/', async (_, res) => {
    try {
        const result = await Result.find()
        res.json(result)
    } catch (err) {
        res.json({ message: err });
    }
});

// Update results
router.post('/', async (req, res) => {
    console.log("Made it to results post")
    const result = new Result({
        games: req.body.games,
    });
    try {
        const savedResult = await result.save()
        res.json(savedResult)
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;