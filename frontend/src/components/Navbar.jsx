import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate("/");
    }

  return <nav className='navbar'>
    <div className='nav-container'>
        <Link to="/" className="navbar-logo">
            PERN
        </Link>
            {user ? (<button className='btn-out' onClick={handleLogout}>Logout</button>
            ) : (
                <>  {/* fragment, w sumie nie wiem dlaczego*/}
                <div className='nav-links'>
                    <Link to="/login" className='nav-link'>
                        Login
                    </Link>
                    <Link to="/register" className='nav-link'>
                        Register
                    </Link>
                </div>
            </>
        )}
    </div>
  </nav>
};

export default Navbar;