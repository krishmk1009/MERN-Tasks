import { useState } from 'react'

import './App.css'

function App() {
  const [showInput, setShowInput] = useState(false)
  const [addBtn, setAddBtn] = useState(true)

  const handleClick = () => {
    setShowInput(true)
    setAddBtn(false)
  }

  const handleDoneClick = () => {
    setShowInput(false)
    setAddBtn(true);
  }

  return (
    <div className="App">
      <div className='adminProfile'>
        <h1> Admin's Tasks </h1>
      </div>

      <div className='taskList'>
        <h3>This is my first task</h3>

      </div>
      <div className='add'>
        {addBtn && (
          <button className='add-btn' onClick={handleClick}>

            Add task +
          </button>
        )}

        {showInput && (
          <div className='input-field'>
            <input type='text' />
            <button className='done-btn' onClick={handleDoneClick}> Done</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default App
