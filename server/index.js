const express = require('express')
const mongoose = require('mongoose')
const User = require("./models/user")
const Task = require("./models/task")
const app = express()
const port = 3000
app.use(express.json());


async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error.message);
    }
}
connectToDB()


app.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body

        const newUser = new User({ username, password })
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        console.error(err)
    }
})


app.post('/users/:userId/tasks', async (req, res) => {
    try {
        const { userId } = req.params;
        const { taskName } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = new Task({ taskName, userId: user._id });
        await task.save();

        user.tasks.push(task);
        await user.save();

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

app.get('/users/:userId/tasks', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json("User not found.");
      }
  
      const tasks = await Task.find({  userId });
      
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})