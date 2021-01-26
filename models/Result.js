const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    afcTeams: {
        type: Array,
    },
    nfcTeams: {
        type: Array,
    },
    games: {
        type: String,
        min: 8,
        required: true
    }
})

module.exports = mongoose.model('Results', ResultSchema)