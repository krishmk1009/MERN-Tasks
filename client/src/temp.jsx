import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'


function App() {
  const [showInput, setShowInput] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");

  const userId = "642b35f14c51da2cbc420da4";

  const addTask = async (taskName) => {
    try {
      const response = await axios.post(`users/${userId}/tasks`, { taskName });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setShowInput(true);
    setAddBtn(false);
  };

  const handleDoneClick = async () => {
    try {
      await addTask(inputTask);
      setInputTask("");
      setShowInput(false);
      setAddBtn(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(`/users/${userId}/tasks`);
        setTasks(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTasks();
  }, []);

  return (
    <div className="App">
      <div className="adminProfile">
        <h1>Admin's Tasks</h1>
      </div>

      <div className="taskList">
        Tasks:
        {tasks.map((task) => {
          return <h3>{task.taskName}</h3>; // use 'taskName' instead of 'title'
        })}
      </div>

      <div className="add">
        {addBtn && (
          <button className="add-btn" onClick={handleClick}>
            Add task +
          </button>
        )}

        {showInput && (
          <div className="input-field">
            <input
              type="text"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
            <button className="done-btn" onClick={handleDoneClick}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


