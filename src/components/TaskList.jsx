import React from 'react';
import './TaskList.css'; 

const TaskList = ({ id, title, tasks, onEdit, onDelete, onComplete }) => {
    return (
        <section id={id} className="task-list-section">
            <h2>{title}</h2>
            <div className="task-list">
                {tasks.length === 0 ? (
                <p>No tasks here</p>
                ) : (
                tasks.map((task, index) => (
                    <div key={task.id} className="task-card">
                    <span className="task-number">#{index + 1}</span>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="task-actions">
                        {task.status === 'pending' && (
                        <button className="btn-complete" onClick={() => onComplete(task.id)}>Completed</button>
                        )}
                        <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
                        <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                    </div>
                ))
                )}
            </div>
        </section>
    );
};

export default TaskList;