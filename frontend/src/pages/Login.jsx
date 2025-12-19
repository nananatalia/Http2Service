import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { set } from 'react-hook-form';

//axios.defaults.withCredentials = true;  // pozwala na wysylanie ciasteczek z kazdym zapytaniem

const Login = ({ setUser }) => {
    
    const [state, setState] = useState("Sign Up"); 
    const [form, setForm ] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleState = (newState) => {     // funkcja do zmiany stanu miedzy "Sign Up" a "Login"
        setState(newState); // Zmiana stanu miedzy "Sign Up" a "Login"
        setForm({   // Resetowanie formularza przy zmianie stanu
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setError(""); // Resetowanie bledow przy zmianie stanu
    };

    const validateFormFrontend = () => {
        if (state === "Sign Up") {
            if (!form.name || form.name.trim().length < 3) {
                setError("Nazwa użytkownika powinna mieć co najmniej 3 znaki.");
                return false;
            }
            if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
                setError("Proszę podać prawidłowy adres e-mail.");
                return false;
            }
            if (form.password !== form.confirmPassword) {
                setError("Hasła się nie zgadzają.");
                return false;
            }
        } else {
            if (!form.name || !form.password) {
                setError("Wypełnij wszystkie pola.");
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async (e) => {
    e.preventDefault();    // zapobiega przeładowaniu strony przy submitowaniu formularza (refresh)
    setError("");
    if (!validateFormFrontend()) {
        return;
    }
    setLoading(true)

    try {
        if (state === "Sign Up") {
            // Rejestracja
            const res = await axios.post("/api/auth/register", form);
            setUser(res.data.user);
            navigate("/dashboard"); 
        } else {
            // Logowanie
            const res = await axios.post("/api/auth/login", form);
            setUser(res.data.user);
            navigate("/dashboard");
        }
    } catch (err) {
        console.error("Błąd", err.response?.data || err.message);
        // Ustawianie odpowiedniego komunikatu o błędzie
        const errorMsg = err.response?.data?.message || err.response?.data?.error;  
        if (errorMsg) {
            setError(errorMsg);
        } else {
            if (state === "Sign Up") {
                setError(alert("Rejestracja nie powiodła się. Spróbuj ponownie."));
            } else {
                setError("Zła nazwa użytkownika lub hasło.");
            }
        }
    } finally {
        setLoading(false);
    }
}
    return <div className='form'>
                <div className='form-header'>
                    <p>{state === "Sign Up" ? "Zarejestruj się" : "Zaloguj się"}</p>
                </div>
                <form onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
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
                    {state === "Sign Up" && (
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
                    )}
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

                    {state === "Sign Up" ? (
                        <button className='btn' type='submit'>Zarejestruj się</button>
                    ) : (
                        <button className='btn' type='submit'>Zaloguj się</button>
                    )}
                    
                </form>

                {state === "Sign Up" ? (
                    <p>Masz już konto?{' '}<span onClick={() => setState('Login')} className='link'>Zaloguj się</span></p>)
                    : (
                        <p>Nie masz konta?{' '}<span onClick={() => setState('Sign Up')} className='link'>Zarejestruj się</span></p>
                )}

                <p><span onClick={() => navigate('/reset-password')} className='link'>Zapomniałeś hasła?</span></p>
            </div>
}



export default Login;