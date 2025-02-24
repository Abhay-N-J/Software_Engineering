const mongoose = require('mongoose');

const AnswerModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    survey: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model("Answers", AnswerModel, "Answers")