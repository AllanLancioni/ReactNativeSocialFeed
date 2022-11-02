import { createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from '../../firebase'


export const AuthContext = createContext({})

export const AuthContextProvider = function ({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check Auth, setting logged in or logged out and returning unsubscribe
  useEffect(() => onAuthStateChanged(auth, (user) => {
    setUser(user || null)
    setLoading(false)
  }, [setUser, setLoading]))

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}