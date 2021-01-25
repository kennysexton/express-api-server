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
router.patch('/', async (req, res) => {
    try {
        const updatedResult = await Result.updateOne(
            { $set: { games: req.body.games } })
        res.json(updatedResult)
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;