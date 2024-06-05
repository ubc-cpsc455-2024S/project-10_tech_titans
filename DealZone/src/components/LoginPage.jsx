import React, { useState } from 'react';
import '../css/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Will add functionality later
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Welcome to DealZone</h2>
            <label>
                Email
            </label> 
            <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br/>

            <label>
                Password
            </label>
            <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br/>
            <button id='loginSubmitbtn' className="button" type="submit">Login</button>
        
            <p>Not registered yet? <a href="">Register</a> with us.</p>
            <p>Continue as <a href="">Guest?</a></p>
        </form>
        </div>
        
    );
};

export default LoginPage;
