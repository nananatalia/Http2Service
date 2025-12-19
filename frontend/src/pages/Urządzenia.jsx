import React from 'react'
import './Urzadzenia.css'
import Dashboard from '../pages/Dashboard'
import Sidebar from '../../components/Sidebar'

function Urządzenia() {
  return (
    <>
    <Sidebar />
    <Dashboard />
    <div className='main-content'>
        <h1 className='header'>Analizator</h1>
        <div className='soundbar'>
          <div className='bars'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
        </div>
      </div>
    </>  
  )
}

export default Urządzenia