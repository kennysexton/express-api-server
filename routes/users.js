const express = require('express');
const router = express.Router();
const User = require('../models/User')
require('dotenv/config');

// Get Users
router.get('/', async (req, res) => {
    try {
        if (req.query.sort) { // If sort parameter is given
            const users = await User.find().sort({ wins: req.query.sort })
            res.json(users)
        } else { // no sort
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
    console.log("Made it to post")
    const user = new User({
        name: req.body.name,
        picks: req.body.picks,
        league: req.body.leaque,
        year: req.body.year
    });
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
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