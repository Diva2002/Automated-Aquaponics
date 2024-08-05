import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AquaponicsPage from './AquaponicsPage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/'element={<AquaponicsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
