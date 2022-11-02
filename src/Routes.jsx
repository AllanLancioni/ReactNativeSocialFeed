import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from './contexts/AuthContext'
import Home from './screens/Home'
import Incentivated from './screens/Incentivated'
import MyPosts from './screens/MyPosts'
import Account from './screens/Account'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import { useContext } from 'react'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import TabBar from './shared/layout/TabBar'
import { View } from 'react-native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Routes() {

  // Logged out routes
  const { user, loading } = useContext(AuthContext)
  const { colors } = useTheme()

  if (loading) return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <ActivityIndicator size={160} animating={true} color={colors.primary} />
    </View>
  )

  if (!user) return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  // Logged in routes
  const getOptions = (title, opts = {}) => ({
    title,
    headerTitle: (props) => <Text {...props} />,
    // headerRight: () => (
    //   <Button onPress={() => alert('This is a button!')} color="#fff">user</Button>
    // ),
    ...opts
  })

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} options={getOptions('MyApp')} />
        <Tab.Screen name="Incentivated" component={Incentivated} options={getOptions('Incentivated')} />
        <Tab.Screen name="MyPosts" component={MyPosts} options={getOptions('MyPosts')} />
        <Tab.Screen name="Account" component={Account} options={getOptions('Account')} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Routes