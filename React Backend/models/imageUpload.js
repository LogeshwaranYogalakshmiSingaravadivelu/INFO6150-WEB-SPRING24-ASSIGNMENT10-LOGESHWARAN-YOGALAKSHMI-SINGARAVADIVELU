const mongoose = require('mongoose')

const imageUpload = new mongoose.Schema({
    image: {
        type: String,
        required:false
    }
})

module.exports = mongoose.model('Image', imageUpload)