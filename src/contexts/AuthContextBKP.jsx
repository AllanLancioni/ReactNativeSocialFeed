import { createContext, useState, useCallback, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_KEY = '@user'

const users = [
  {
    username: 'test',
    password: 'asdf9358',
    name: 'Test User'
  }
]

export const AuthContext = createContext({})

async function getStorageUser() {
  try {
    const value = await AsyncStorage.getItem(USER_KEY)
    return value != null ? JSON.parse(value) : null
  } catch(e) {
    console.error(e)
    return null
  }
} 

export const AuthContextProvider = function ({ children }) {

  const [user, setUser] = useState(null)
  useEffect(() => {
    getStorageUser().then(user => setUser(user))
    console.log('oi')
  }, [setUser])

  const setStorageUser = async (value) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(value || null))
      setUser(value)
    } catch(e) {
      console.error(e)
    }
  }

  const login = async (params) => {
    const data = users.find(user => params.username === user.username && params.password === user.password)
    if (!data)
      return Promise.reject(null)
    const newUser = { ...data }
    setStorageUser(newUser)
    return Promise.resolve(newUser)
  }



  const logout = useCallback(async () => {
    navigation.navigate('Login')
    setStorageUser(null)
  }, [setUser])

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}