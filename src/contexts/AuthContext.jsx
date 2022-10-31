import { createContext, useState, useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

import { app } from '../../firebase'


export const AuthContext = createContext({})
const auth = getAuth(app)

export const AuthContextProvider = function ({ children }) {

  const [user, setUser] = useState(null)

  // Check Auth, setting logged in or logged out and returning unsubscribe
  useEffect(() => onAuthStateChanged(auth, (user) => setUser(user || null)), [])

  const createUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      setUser(userCredential.user)
      return Promise.resolve(userCredential.user)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`ERROR ${errorCode}: ${errorMessage}`)
      setUser(null)
      return Promise.reject(null)
    }
  }

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setUser(userCredential.user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(`ERROR ${errorCode}: ${errorMessage}`)
        setUser(null)
      })
  }

  const logout = () => {
    auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ login, logout, createUser, user }}>
      {children}
    </AuthContext.Provider>
  )
}