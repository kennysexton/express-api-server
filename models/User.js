const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picks: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    loses: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    style: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Users', UserSchema)