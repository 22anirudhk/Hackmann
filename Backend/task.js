//Mongoose schema
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }    
})

module.exports = mongoose.model('Task', taskSchema); //Just do it

