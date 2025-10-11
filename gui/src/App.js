import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage (later replace with DB)
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), description: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-lg mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Simple Task Manager
        </h1>
        <div className="flex mb-6 shadow-lg">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 p-3 border border-gray-600 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-r-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className={`text-lg ${task.done ? 'line-through text-gray-400' : 'text-gray-100'}`}>
                  {task.description}
                </span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default App;
