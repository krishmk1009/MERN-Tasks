const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require("./models/user")
const Task = require("./models/task")
const app = express()
const port = 5173 
app.use(express.json());
app.use(cors());


async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/todo_data', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error.message);
    }
}
connectToDB();

app.post('/tasks', async (req, res) => {
    try {
        const { taskName } = req.body;
        const task = new Task({ taskName })
        await task.save();
        res.status(200).json(task)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find();
        if (task.length === 0) {
            return res.status(404).json("data not found")
        }
        // const taskName = task.map(task => task.taskName)
        res.status(200).json(task)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
