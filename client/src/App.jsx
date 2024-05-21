import {BrowserRouter, Routes, Route, } from "react-router-dom"
import Users from "./Users"
import Creat from "./Creat"

import Update from "./Update"

export default function App() {
  return(
    
    <BrowserRouter>
          <Routes>
             <Route path="/" element={<Users />}/> 
             <Route path="/Creat" element={<Creat />}></Route>
             <Route path="/Update/:id" element={<Update />}></Route>

            </Routes>
    
    
    </BrowserRouter>
  
  )
}