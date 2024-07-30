import React from 'react'
import { Header } from '../components/Header'
import { SignupSigninComponent } from '../components/Signup'

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignupSigninComponent/>
      </div>
    </div>
  )
}

export default Signup