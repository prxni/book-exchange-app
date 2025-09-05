const mongoose = require('mongoose')

const tokensSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Tokens", tokensSchema)
