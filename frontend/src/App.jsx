import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import axios from 'axios'
import NotFound from './components/NotFound.jsx'

axios.defaults.withCredentials = true;  // pozwala na wysylanie ciasteczek z kazdym zapytaniem

function App() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // pobieranie zalogowanego uzytkownika, czyli sprawdzanie czy sesja jest wazna
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);    // pusty array dependencies, wiec useEffect wykona sie tylko raz przy ladowaniu komponentu

  if (loading) {
    return <div>Loading...</div>;
  }

  // gniazdkowanie routow
  return (
    <Router>
      <div className='app'> 
        <Navbar user={user} setUser={setUser}/>
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home user={user} error={error} />} />
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path='/register' element={user ? <Navigate to="/" /> : <Register setUser={setUser}/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
