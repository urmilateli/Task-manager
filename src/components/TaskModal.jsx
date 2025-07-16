import React, { useState, useEffect } from 'react';
import './TaskModal.css'; 

const TaskModal = ({ onClose, onSave, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>×</span>
                <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button type="submit">{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;