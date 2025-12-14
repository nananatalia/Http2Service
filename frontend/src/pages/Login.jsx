import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    
    const [form, setForm ] = useState({
        name: "",
        password: "",
    })
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();    // zapobiega przeładowaniu strony przy submitowaniu formularza (refresh)
        try {
            const res = await axios.post("/api/auth/login", form);
            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            setError("Wrong name or password");
        }
    }

    return <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='header'>Login</h2>
            {error && <p className='error'>{error}</p>}
            <input 
                type='text'
                placeholder='Name'
                className='input'
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input 
                type='password'
                placeholder='Password'
                className='input'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className='btn'>Login</button>
        </form>
    </div>
}

export default Login;

