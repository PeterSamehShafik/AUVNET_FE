import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthProvider.jsx';
import axios from './API/axios.js';
import SplashScreen from './common/SplashScreen.jsx';
import AppRouter from './Routes/AppRouter.jsx';

function App() {
  const contextValue = useContext(AuthContext);
  const { auth, setAuth } = contextValue || {}
  const [loading, setLoading] = useState(true)

  const validateUser = async () => {
    try {
      const response = await axios.get("/users/profile");
      if (response.data?.data?.user) {
        setAuth(response.data.data.user)
      } else {
        logout()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const res = await axios.get("/users/logout");
      setAuth(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    validateUser()
  }, [])

  return <>
    {loading ? <SplashScreen /> : <div className="App text-gray-900 dark:text-gray-50">
      <AppRouter logout={logout} validateUser={validateUser} />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
        theme='dark'
      />
    </div>}
  </>
}

export default App;
