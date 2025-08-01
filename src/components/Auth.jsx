import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
        onLogin({ name, email });
        }
    };

    return (
        <div className="auth-view">
        <div className="form-container">
            <h1>Signup</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="off" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-password" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
            <button type="submit">signup</button>
            </form>
        </div>
        </div>
    );
};

export default Auth;