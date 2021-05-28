const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    NFL: {
        2020: {
            type: String
        },
    },
    NBA: {
        2021: {
            type: String
        },
    },
    NHL: {
        2021: {
            type: String
        },
    },
    games: {
        type: String,
        min: 8,
        required: true
    }
})

module.exports = mongoose.model('Results', ResultSchema)