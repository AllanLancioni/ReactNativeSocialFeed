
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper'
import { AuthContextProvider } from './src/contexts/AuthContext'
import Routes from './src/Routes'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5E548E',
    secondary: '#ff7043',
    light1: '#9F86C0',
    light2: '#BE95C4',
    light3: '#E0B1CB',
    
  },
}

export default function App() {
  return (
    <AuthContextProvider>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </AuthContextProvider>
  )
}

