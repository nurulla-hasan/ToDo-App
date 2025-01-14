import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [filter, setFilter] = useState('All');
    const API_URL = 'http://localhost:3000/todos';
    console.log(tasks);

    // Fetch tasks from API
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Add a task
    const addTask = () => {
        axios.post(API_URL, { ...newTask, completed: false })
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error('Error adding task:', error));
    };

    // Update a task
    const updateTask = (id, updates) => {
        axios.put(`${API_URL}/${id}`, updates)
            .then(response => {
                setTasks(tasks.map(task => task.id === id ? response.data : task));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    // Delete a task
    const deleteTask = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(error => console.error('Error deleting task:', error));
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return task.completed;
        if (filter === 'Incomplete') return !task.completed;
        return true;
    });

    return (
        <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white">
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold text-center mb-8">To-Do List</h1>

                {/* Add Task Section */}
                <div className="mb-6">
                    <input 
                        type="text" 
                        placeholder="Task Title" 
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                    />
                    <textarea 
                        placeholder="Task Description" 
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full p-3 mb-4 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                    ></textarea>
                    <button 
                        onClick={addTask} 
                        className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Add Task
                    </button>
                </div>

                {/* Filter Section */}
                <div className="mb-6">
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                </div>

                {/* Task List Section */}
                <div>
                    {filteredTasks.map(task => (
                        <Task 
                            key={task.id} 
                            task={task} 
                            onUpdate={updateTask} 
                            onDelete={deleteTask} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
