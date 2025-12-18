import React from 'react'
import './Home.css'

function HomePage() {
  return (
    <div className='main-text'>
        <img src="src/assets/sound-bar.svg" alt="logo image" className='logo' />
        <h1>Analizator Widma</h1>
        <p>Witaj w naszej internetowej aplikacji.</p>
        <p>Modyfikuj tak jak chcesz - customizacja kolorów i ustawień pozwala dopasować urządzenie do Twojego stylu!</p>

        <button>Zaczynamy</button>
    </div>
  )
}

export default HomePage