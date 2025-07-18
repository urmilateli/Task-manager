import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) setTasks(storedTasks);
    }
    
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [user, tasks]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setTheme('light');
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    localStorage.removeItem('theme');
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), status: 'pending' }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {user ? (
        <TaskManager
          user={user}
          tasks={tasks}
          onLogout={handleLogout}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
          onToggleTheme={toggleTheme}
          currentTheme={theme}
        />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;