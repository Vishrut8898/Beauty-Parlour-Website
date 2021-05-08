const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    pic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    down: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Service', serviceSchema)