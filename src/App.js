import React, { useEffect } from 'react';
import './App.css';
import Telegram from './components/Telegram';
import {useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import {auth} from './firebase'
import Login from './components/Login';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // login
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        )
      } else {
        dispatch(logout())
      }
    });
  }, [dispatch])
  return ( 
    <div className = "app" > {
      user ? < Telegram /> : < Login />
    } 
    </div>
  );
}

export default App;