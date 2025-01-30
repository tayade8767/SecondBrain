 
// import React from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashbord } from "./Pages/Dashbord"
import { SignUp } from "./Pages/SignUp"
import { SignIn } from "./Pages/SignIn"
import { SharePage } from "./Pages/SharePage"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/dashbord" element={<Dashbord/>} />
          <Route path="/share/:params" element={<SharePage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App