const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    afcTeams: {
        type: Array[String],
    },
    nfcTeams: {
        type: Array[String],
    },
    games: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Results', ResultSchema)