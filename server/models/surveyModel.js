const mongoose = require('mongoose');

const SurveyModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    surveys: {
        type: Object,
        required: true
    }  
})

module.exports = mongoose.model("Survey", SurveyModel, "Surveys")
