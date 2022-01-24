const express = require('express');
const router = express.Router();
const Result = require('../models/Result')
const User = require('../models/User')
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

// Update NFL results
router.patch('/nfl', async (req, res) => {
    console.log("patch sent!")
    try {
        patchRequest("NFL", req);

        const users = await User.find({ league: "NFL", year: year }).exec()
        console.log(`making updates to users: ${users}`)

        // update players score on new result updated
        await updatePlayerScore(users, picks)

        res.json(updatedResult)
    } catch (err) {
        res.json({ message: err });
    }
})

// Update NHL results
router.patch('/nhl', async (req, res) => {
    console.log("patch sent!")
    try {
        console.log(`${JSON.stringify(req.body)}`)
        newResult = req.body

        // Get the year included in the patch
        year = Object.keys(newResult)[0]
        picks = Object.values(newResult)[0]

        console.log(`Extracted year: ${year}`)
        const updatedResult = await Result.updateOne(
            { $set: { NHL: newResult } })

        const users = await User.find({ league: "NHL", year: year }).exec()
        console.log(`making updates to users: ${users}`)

        // update players score on new result updated
        await updatePlayerScore(users, picks)

        res.json(updatedResult)
    } catch (err) {
        res.json({ message: err });
    }
})

// Update NBA results
router.patch('/nba', async (req, res) => {
    console.log("patch sent!")
    try {
        console.log(`${JSON.stringify(req.body)}`)
        newResult = req.body

        // Get the year included in the patch
        year = Object.keys(newResult)[0]
        picks = Object.values(newResult)[0]

        console.log(`Extracted year: ${year}`)
        const updatedResult = await Result.updateOne(
            { $set: { NBA: newResult } })

        const users = await User.find({ league: "NBA", year: year }).exec()
        console.log(`making updates to users: ${users}`)

        // update players score on new result updated
        await updatePlayerScore(users, picks)

        res.json(updatedResult)
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;

// Updates the corresponding mongoDB document
async function patchRequest(league, req){
    console.log(`${JSON.stringify(req.body)}`)
    newResult = req.body

    // Get the year included in the patch
    year = Object.keys(newResult)[0]
    picks = Object.values(newResult)[0]

    console.log(`Extracted year: ${year}`)
    const updatedResult = await Result.updateOne(
        { $set: { [league]: newResult } })
}

// Loop through users and update their wins,loses, total
async function updatePlayerScore(users, newResult) {
    if (newResult.length >= 8) {
        // Last element
        winnerDivision = newResult[newResult.length - 1]
    } else {
        throw (`newResult is not the expected length ${newResult.length}`)
    }

    var middleElement = Math.floor((newResult.length - 1) / 2)

    await users.forEach(async function (user) {
        var correct = 0;
        var wrong = 0;
        var total = 0;
        var style = [] // 1 correct, 2 wrong

        userPick = user.picks

        // User.picks must be in the same format as result
        if (userPick.length == newResult.length) {
            // Loop through characters of user.picks
            for (var i = 0; i < userPick.length - 1; i++) {
                if (newResult[i] != 0) { // If zero - game has not been played
                    if (i == middleElement) { //super bowl
                        if (userPick[userPick.length - 1] == winnerDivision && userPick[i] == newResult[i]) {
                            correct++;
                            style[i] = 1
                        } else {
                            wrong++;
                            style[i] = 2
                        }
                    }
                    else if (userPick[i] == newResult[i]) {
                        correct++;
                        style[i] = 1
                    } else {
                        wrong++;
                        style[i] = 2
                    }
                    total++;
                } else { style[i] = 0 }
            }
        } else {
            throw ("User picks (" + user.picks.length + ") did not have the same lenght as result (" + newResult.length + "),  cannot grade for User: " + user.name)
        }
        // console.log(user.name + ":" + correct + "-" + wrong + "-" + total + " | " + style)
        await User.updateOne(
            { _id: user._id },
            { $set: { wins: correct, loses: wrong, total: total, style: style } })
    });
}