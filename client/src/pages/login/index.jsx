import React, { useRef, useState } from 'react';
import './styles.css'

import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const form = useRef(null);

    const handleLogin = () => {
        console.log('login', form.current.reportValidity())
        history.push("/dashboard");
    }

    const handleRegister = () => {
        console.log('register')
    }

    return ( 
        <div className="loginPage">
            <form ref={form}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="button" onClick={handleLogin}>Login</button>
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </div>
     );
}
 
export default Login;