import React from "react";
import { useEffect, useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { Routes, useLocation, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import DevicesHome from "./pages/devices/Devices";
import AddDevice from "./pages/devices/AddDevice";
import EditDevice from "./pages/devices/EditDevice";
import Dashboard from "./pages/dashboard/Dashboard";
import Analytic from "./pages/analytics/Analytic";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import OpenRoute from "./components/core/auth/OpenRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [showArrow, setShowArrow] = useState(false)
  const handleArrow = () => {
    if (window.scrollY > 500) {
      setShowArrow(true)
    } else setShowArrow(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleArrow);
    return () => {
      window.removeEventListener('scroll', handleArrow);
    }
  }, [showArrow])

  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <Navbar />

      {/* go upward arrow */}
      <button onClick={() => window.scrollTo(0, 0)}
        className={`bg-yellow-25 hover:bg-yellow-50 hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${showArrow ? 'bottom-6' : '-bottom-24'} `} >
        <HiArrowNarrowUp />
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={
          <ProtectedRoute>
            <DevicesHome />
          </ProtectedRoute>
        } />
        <Route path="/add-device" element={
          <ProtectedRoute>
            <AddDevice />
          </ProtectedRoute>
        } />
        <Route path="/edit-device/:id" element={
          <ProtectedRoute>
            <EditDevice />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } /> 

        <Route path="/analytic" element={
          <ProtectedRoute>
            <Analytic />
          </ProtectedRoute>
        } />

        <Route
          path="signup" element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App;
