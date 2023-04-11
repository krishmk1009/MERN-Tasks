const mongoose = require("mongoose")
// const User = require("./user")

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true,

    }
    // ,
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     default:"642b35f14c51da2cbc420da4"
    // }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task;