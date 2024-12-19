import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import AboutUs from './AboutUs.jsx'
import Home from './Home.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AquaponicsPage from './AquaponicsPage.jsx'
import Prediction from './Prediction.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/prediction' element={<Prediction/>}/>
        <Route path='/'element={<AquaponicsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
