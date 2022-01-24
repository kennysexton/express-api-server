const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    NFL: {},
    NBA: {},
    NHL: {},
})

module.exports = mongoose.model('Results', ResultSchema)