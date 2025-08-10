const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    time:
    {
        type: Number,
        required: true
    },
    questionString:{
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model("Test", testSchema);