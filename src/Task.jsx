function Task({ task, onUpdate, onDelete }) {
    return (
        <div className="p-6 mb-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
            <p className="text-gray-400 mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
                <button 
                    
                    onClick={() => onUpdate(task.id, { completed: !task.completed })}
                    className={`px-6 py-2 text-white rounded-lg transition-colors duration-300 ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {task.completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button 
                    onClick={() => onDelete(task.id)}
                    className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Task;
