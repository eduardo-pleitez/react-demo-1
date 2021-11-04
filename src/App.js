import React, { useState, useRef, useEffect} from 'react';
import Tasklist from './Tasklist';
import './App.css';
import {v4 as uuidv4} from 'uuid';


const STORAGE_KEY = "tasksApp";

function App() {
  const [tasks, setTasks] = useState([])
  const taskInput = useRef()

  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if(storedTasks) setTasks(storedTasks)
    }, [])

  useEffect(()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    },[tasks])

  function addTask(e){
     const name = taskInput.current.value;
     if(name === "") return;
     setTasks(prevTasks => {
      return [...prevTasks, {id:uuidv4(), name:name, completed: false}]
     })
     taskInput.current.value = null;
  }

  function taskToggle(id){
    const newTasksArray = [...tasks]
    const task = newTasksArray.find(task=> task.id === id)
    task.completed = !task.completed
    setTasks(newTasksArray)
  }
  function closeTask(id){
    const newTasksArray = [...tasks]
    const task = newTasksArray.findIndex(task => task.id === id)
    newTasksArray.splice(task, 1)
    setTasks(newTasksArray)
  }
  function deleteCompleteTasks(){
    const newTasksArray = tasks.filter(task => !task.completed)
    setTasks(newTasksArray)
  }
  return (
    <div className="myApp">
      <div className="appTitle"><h1>Organize your tasks</h1></div>
      <div className="taskSection">
        <Tasklist tasks={tasks} taskToggle={taskToggle} closeTask={closeTask}/>
      </div>
      <input className="inptxt" ref={taskInput} type="text" />
      <div>
        <button className="taskBtn" onClick={addTask}>Add task</button>
        <button className="taskBtn" onClick={deleteCompleteTasks}>Delete completed</button>
      </div>
      <div className="taskLeft">{tasks.filter(task => !task.completed).length} Tasks left</div>
    </div>
  );
}

export default App;
