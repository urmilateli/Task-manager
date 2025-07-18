import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import './TaskManager.css';

const TaskManager = ({ user, tasks, onLogout, onAddTask, onUpdateTask, onDeleteTask, onCompleteTask, onToggleTheme, currentTheme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    const openAddModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSaveTask = (taskData) => {
        if (taskToEdit) {
            onUpdateTask({ ...taskToEdit, ...taskData });
        } else {
            onAddTask(taskData);
        }
        closeModal();
    };

    return (
        <>
            <header className="header">
                <h1>Welcome, {user.name}</h1>
                <div className="header-controls">
                    <button onClick={onToggleTheme} className="theme-toggle">
                        {currentTheme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button onClick={onLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <main className="task-manager-container">
                <TaskList id="pending-tasks" title="Pending Tasks" tasks={pendingTasks} onEdit={openEditModal} onDelete={onDeleteTask} onComplete={onCompleteTask} />
                <TaskList id="completed-tasks" title="Completed Tasks" tasks={completedTasks} onEdit={openEditModal} onDelete={onDeleteTask} />
            </main>

            <button className="floating-btn" onClick={openAddModal}>+</button>

            {isModalOpen && <TaskModal onClose={closeModal} onSave={handleSaveTask} taskToEdit={taskToEdit} />}
        </>
    );
};

export default TaskManager;