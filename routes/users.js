const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


var fs = require('fs');

var users = [];

try {
    data = fs.readFileSync('data/users.json');
    users = JSON.parse(data)
    console.log(users);
} catch (e) {
    console.error(e.stack);
}

router.get('/', (_, res) => {
    res.send('Your Express App');
});

// Get Users
router.get('/users', (_, res) => {
    res.json({ ok: true, users });
});

router.get('/user/:name', (req, res) => {
    const { name } = req.params;
    const user = users.filter((user) => user.name === name)[0];
    res.json({ ok: true, user });
});

router.post('/adduser', (req, res) => {
    console.log("Made it to post")
    const { name, picks } = req.body
    if (name && picks) {
        users.push({ name, picks });
        res.json({ ok: true, users });
        writeToJSONFile(users)
    } else {
        var msg = "Required parameters not complete";
        res.json({ ok: false, msg: msg })
    }
});

mongoose.connect(
    'mongodb+srv://Admin:g9HdJgWF2bBeOx3y@bracketapi.biekg.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to DB")
    })

module.exports = router;

function writeToJSONFile(result) {

    fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("length:" + data.length)
            if (data.length == 0) {
                console.log("emplty data ")
            }
            json = JSON.stringify(users); //convert it back to json
            fs.writeFile('data/users.json', json, 'utf8', (err) => {
                if (err) throw err;
            });
        }
    });
}