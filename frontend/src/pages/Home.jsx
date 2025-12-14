import React from 'react';
import './Home.css';

function Home ({ user, error }) {
  return <div>
    <div className='container'>
      {error && <p className='error'>{error}</p>}
      {user ? (
        <div className='info'>
          <h1>Witaj, {user.name}!</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <h2 className='info2'>Potrzeba się zalogować bądź zarejestrować do dalszych działań.</h2>
      )}
    </div>
  </div>
}

export default Home;