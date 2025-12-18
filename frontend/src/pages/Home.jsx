import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function HomePage() {

  const navigate = useNavigate();

  return (
    <div className='main-text'>
        <img src="src/assets/sound-bar.svg" alt="logo image" className='logo' />
        <h1>Analizator Widma</h1>
        <p>Witaj w naszej internetowej aplikacji.</p>
        <p>Modyfikuj tak jak chcesz - customizacja kolorów i ustawień pozwala dopasować urządzenie do Twojego stylu!</p>

        <button onClick={() => navigate("/login")}>Zaczynamy</button>
    </div>
  )
}

export default HomePage