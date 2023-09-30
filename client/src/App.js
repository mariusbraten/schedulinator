import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ task: "", date: "" });

  // Getting all of the tasks for the list
  const getTasks = async () => {
    const res = await axios.get("/tasks");
    const { data } = res;
    setTasks(data);
  }

  // Call the get function
  useEffect(() => {
    getTasks();
  }, []);

  // Post an item to the database and use the response to add the item to the list
  const postForm = e => {
    e.preventDefault();
    
    axios.post("/task/new", {
      task: form.task,
      date: form.date
    }).then(res => {
      const { data } = res;
      const id = data.id;
      const task = data.data.task;
      const date = data.data.date;
      setTasks([...tasks, { id: id, task: task, date: date }])
    });

    setForm({ task: "", date: "" });
  }

  // Updating the values
  const handleInputChange = e => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }

  // Handle delete button click
  const deleteTask = id => {
    axios.delete('/task/delete', { data: { id: id } })
      .then(res => setTasks(tasks.filter(item => item.id !== id)));
  }

  // Handle update button click
  const updateTask = id => {
    // Prevent update on missing data
    if (!form.task || !form.date) return;

    axios.patch('/task/patch', { data: { id: id, task: form.task, date: form.date } })
      .then(res => {
        const { id, task, date } = res.data.data;
        const index = tasks.map(task => task.id).indexOf(id);
        tasks[index] = { id: id, task: task, date: date };
        setTasks([...tasks]);
      });
    
    setForm({ task: "", date: "" })
  }
  
  return (
    <div className="App">
      <h1>Tasks</h1>
      <form id="formPost" onSubmit={postForm}>
        <label>
          Task:
          <input type="text" name="task" value={form.task} onChange={handleInputChange} required/>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleInputChange} required/>
        </label>
        <br />
        <button>Add task</button>
      </form>
      <ul>
        {tasks.map(task =>
            <li key={task.id}>{task.task} {task.date}
              <button onClick={() => deleteTask(task.id)}>delete</button>
              <button onClick={() => updateTask(task.id)}>Update</button>
            </li>
        )}
      </ul>
    </div>
  );
}

export default App;
