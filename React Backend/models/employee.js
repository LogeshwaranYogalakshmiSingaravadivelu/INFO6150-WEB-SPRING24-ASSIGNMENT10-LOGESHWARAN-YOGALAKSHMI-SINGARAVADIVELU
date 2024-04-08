const mongoose = require('mongoose')

const employee = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    salary: {
        type: Number,
        required:true,
        unique: false
    }
})

module.exports = mongoose.model('Employee', employee)