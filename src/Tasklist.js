import React from 'react';
import Task from './Task';

export default function Tasklist({tasks, taskToggle, closeTask}) {
  return (
      tasks.map(task => { return <Task key={task.id} taskToggle={taskToggle} closeTask={closeTask} task={task}/>;
      })
  )
}
