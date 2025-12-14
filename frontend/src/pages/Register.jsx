import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'


axios.defaults.withCredentials = true; 

const Register = ({ setUser }) => {

    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", form);
            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            console.error("Bład", err.response?.data || err.message)
            setError("Register failed.");
        }
    }
    return <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='header'>Register</h2>
            {error && <p className='error'>{error}</p>}
            <input 
                type='email'
                placeholder='E-mail'
                className='input'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
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
            <button className='btn'>Register</button>
        </form>
    </div>
}

export default Register;