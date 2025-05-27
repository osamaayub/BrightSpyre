"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // On mount, call an API to check if token cookie is valid
    async function checkAuth() {
      const res = await fetch('/api/auth/session') // your endpoint to verify token cookie
      if (res.ok) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn')
      }
    }
    checkAuth()
  }, [])

  const login = () => {
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }) // endpoint to clear cookie
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}