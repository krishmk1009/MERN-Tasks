const mongoose = require("mongoose")
const User = require("./user")

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true,

    }
    ,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task;