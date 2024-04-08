const mongoose = require('mongoose')

const data_types = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required:false
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Data', data_types)