import React from 'react'
import "./Task.css";

export default function Task({task, taskToggle, closeTask}) {
  function handleTaskToggle(){
    taskToggle(task.id)
  }
  function handleTaskClose(){
    closeTask(task.id)
  }
  return (
    <div className="eachTask">
      <label>
        <input type="checkbox" checked={task.completed} onChange={handleTaskToggle}/>
        {task.name}
        <span className="closeBtn" onClick={handleTaskClose}>&times;</span>
      </label>
    </div>
  )
}
