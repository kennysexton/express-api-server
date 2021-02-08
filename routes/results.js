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

// Update results
router.patch('/', async (req, res) => {
    console.log("patch sent!")
    try {
        newResult = req.body.games
        const updatedResult = await Result.updateOne(
            { $set: { games: newResult } })

        const users = await User.find()

        // update players score on new result updated
        await updatePlayerScore(users, newResult)

        res.json(updatedResult)
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;

// Loop through users and update their wins,loses, total
async function updatePlayerScore(users, newResult) {
    if (newResult.length == 8) {
        winnerDivision = newResult[7]
    } else {
        throw ("newResult is not the expected length (" + newResult.length + ")")
    }

    await users.forEach(async function (user) {
        var correct = 0;
        var wrong = 0;
        var total = 0;
        var style = [] // 1 correct, 2 wrong

        userPick = user.picks

        // User.picks must be in the same format as result
        if (userPick.length == newResult.length) {
            console.log(userPick)
            // Loop through characters of user.picks
            for (var i = 0; i < userPick.length - 1; i++) {
                if (newResult[i] != 0) { // If zero - game has not been played
                    if (i == 3) { //super bowl
                        if (userPick[7] == winnerDivision && userPick[i] == newResult[i]) {
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
            console.error("User picks (" + user.picks.length + ") did not have the same lenght as result (" + newResult.length + "),  cannot grade for User: " + user.name)
        }
        // console.log(user.name + ":" + correct + "-" + wrong + "-" + total + " | " + style)
        await User.updateOne(
            { _id: user._id },
            { $set: { wins: correct, loses: wrong, total: total, style: style } })
    });
}