import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'


function App() {
  const [showInput, setShowInput] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");



  const handleClick = () => {
    setShowInput(true);
    setAddBtn(false);
  };

  const addTask = async (taskName) => {
    try {
      const response = await axios.post('http://localhost:5173/tasks', { taskName })
      setTasks([...tasks, response.data]);
    }
    catch (err) {
      console.log(err);
    }
  }

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
        const response =  await axios.get("http://localhost:5173/tasks");
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
        {tasks.map((task , index) => {
          return <h3 key={index}>{task.taskName}</h3>; // use 'taskName' instead of 'title'
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


