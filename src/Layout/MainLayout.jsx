import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Pages/Shared/NavBar/NavBar'
import Footer from '../Pages/Shared/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
        <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
    </div>
  )
}