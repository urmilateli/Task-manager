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
            <h1>Login</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Auth;