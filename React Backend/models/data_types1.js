const mongoose = require('mongoose')

const data_types1 = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    },
    applyLink: {
        type: String,
        required:false
    }
})

module.exports = mongoose.model('Data1', data_types1)