const mongoose = require('mongoose')

const Tokens = mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = new mongoose.model("Tokens", Tokens)