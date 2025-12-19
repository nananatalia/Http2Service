import React from 'react'
import './Sidebar.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Urządzenia"); // Domyślnie wchodzimy na "Urządzenia"

  const handleNavigation = (page, path) => {
    setActive(page);
    navigate(path);
  }

  return (
    <div className='container'>
      <div className='sidebar'>
        <img src='src/assets/user3.png' alt='Profile Picture' className='prof-img' />
        <div className='user-info'>
          <h2>John Doe</h2>
          <hr />
          <h3 id='info' className={active === "Urządzenia" ? "active" : ""} onClick={() => handleNavigation("Urządzenia", "/urządzenia")}>Urządzenia</h3>
          <h3 className={active === "Ustawienia" ? "active" : ""} onClick={() => handleNavigation("Ustawienia", "/ustawienia")}>Ustawienia</h3>
          <h3 className={active === "Historia" ? "active" : ""} onClick={() => handleNavigation("Historia", "/historia")}>Historia</h3>
          <h3 className={active === "Konto" ? "active" : ""} onClick={() => handleNavigation("Konto", "/konto")}>Konto</h3>
          <button onClick={() => navigate('/')} className='logout-btn'>Wyloguj się</button>
        </div>
      </div>
      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar