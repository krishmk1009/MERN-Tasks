const mongoose = require("mongoose")
const Task = require("./task")

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

const User = mongoose.model("User", userSchema);

module.exports = User