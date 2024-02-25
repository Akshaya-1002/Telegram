import React from 'react'
import { Button } from '@mui/material'
import {auth, provider} from '../firebase';
import './Login.css'

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }
  return (
    <div className='login'>
      <div className='login_telegram'>
        <img src={`${process.env.PUBLIC_URL}tele.png`} alt='telegram'/>
    {/* <img src={process.env.PUBLIC_URL + '/yourPathHere.jpg'} />  */}
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
