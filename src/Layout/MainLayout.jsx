import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Pages/Shared/NavBar/NavBar'
import Footer from '../Pages/Shared/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}