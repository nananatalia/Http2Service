import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    
    const [state, setState] = useState("Sign Up"); 
    const [form, setForm ] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();    // zapobiega przeładowaniu strony przy submitowaniu formularza (refresh)
    try {
        if (state === "Sign Up") {
            const res = await axios.post("/api/auth/register", form);
            setUser(res.data.user);
            navigate("/");
        } else {
            const res = await axios.post("/api/auth/login", form);
            setUser(res.data.user);
            navigate("/");
        }
    } catch (err) {
        console.error("Błąd", err.response?.data || err.message);
        if (state === "Sign Up") {
            setError("Register failed.");
        } else {
            setError("Zła nazwa użytkownika lub hasło.");
        }
    }
}
    return <div className='container'>
                <div className='form-header'>
                    <p>{state === "Sign Up" ? "Zarejestruj się" : "Zaloguj się"}</p>
                </div>
                <form onSubmit={handleSubmit}>
                <h2 className='header'>Login</h2>
                {error && <p className='error'>{error}</p>}
                {state === "Sign Up" && (
                    <div className='form-group'>
                        <label className='label'>Nazwa użytkownika</label>
                        <input 
                            type='text'
                            placeholder='Name'
                            className='input'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                )}
                    <div className='form-group'>
                        <label className='label'>Adres e-mail</label>
                        <input 
                            type='email'
                            placeholder='Email'
                            className='input'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className='form-group'>
                        <label className='label'>Hasło</label>
                        <input 
                            type='password'
                            placeholder='Password'
                            className='input'
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    {state === "Sign Up" && (
                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Potwierdź hasło</label>
                            <input 
                                id='confirmPassword'
                                type='password'
                                placeholder='••••••••'
                                className='input'
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>
                    )}
                </form>

                {state === "Sign Up" ? (
                    <p onClick={''}>Masz już konto?{' '}<span onClick={() => setState('Login')} className='link'>Zaloguj się</span></p>)
                    : (
                        <p>Nie masz konta?{' '}<span onClick={() => setState('Sign Up')} className='link'>Zarejestruj się</span></p>
                )}

                <p><span onClick={() => navigate('/reset-password')} className='link'>Zapomniałeś hasła?</span></p>
            </div>
}



export default Login;