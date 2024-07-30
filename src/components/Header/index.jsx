import React from 'react'
import "./styles.css"

export const Header = () => {

  const logoutFun = () => {
    alert("logout!");
  }


  return (
    <div className='navbar'>
      <p className='logo'>Financify</p>
      <p className='logo link' onClick={logoutFun}>Logout</p>
    </div>

    
  )
}
