const express = require('express');
const router = express.Router();
const User = require('../models/User')
require('dotenv/config');

// Get Users
router.get('/', async (req, res) => {

    // change get request based on query
    let league = req.query.league;
    let year = req.query.year;
    let sort = req.query.sort

    try {
        if (sort) { // If sort parameter is given
            const users = await User.find(({ league: league, year: year })).sort({ wins: sort })
            res.json(users)
        } else if (req.query.league && req.query.year) {
            console.log(`getting users for ${league} in ${year}`)
            const users = await User.find({ league: league, year: year }).exec();
            res.json(users)
        } else { // no sort, all leagues
            console.log("getting every user")
            const users = await User.find()
            res.json(users)
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// Get Users (sorted)
router.get('/sort', async (_, res) => {
    try {
        const users = await User.find().sort({ wins: -1 })
        res.json(users)
    } catch (err) {
        res.json({ message: err });
    }
});

// Submit a user
router.post('/', async (req, res) => {
    try {
        console.log(`Made it to post w/ name: ${req.body.name} | ${req.body.picks} | ${req.body.league} | ${req.body.year}`)
        const user = new User({
            name: req.body.name,
            picks: req.body.picks,
            league: req.body.league,
            year: parseInt(req.body.year)
        });
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        console.error("did not successfully post")
        res.json({ message: err });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { name: req.body.name } })
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;