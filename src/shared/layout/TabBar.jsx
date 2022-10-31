import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, FAB, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BOTTOM_APPBAR_HEIGHT = 50

function TabBar({ state, descriptors, navigation }) {

  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const dictionaryRouteIcon = {
    'Home': 'home',
    'Incentivated': 'heart-multiple',
    'MyPosts': 'post',
    'Account': 'account-circle',
  }

  return (
    <Appbar
      style={[styles.bottom, { height: BOTTOM_APPBAR_HEIGHT + bottom }]}
      safeAreaInsets={{ bottom }}>
      {
        (state?.routes || []).map((route, index) => {
          const isFocused = index === state.index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented)
              navigation.navigate({ name: route.name })
          }

          return <Appbar.Action
            key={route.key}
            color={theme.colors.light1}
            icon={dictionaryRouteIcon[route.name]}
            style={{ opacity: isFocused ? 1 : 0.6, flex: 1 }}
            onPress={onPress} />
        })
      }
    </Appbar>
  )
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  }
})

export default TabBar


// import { StyleSheet } from "react-native"
// import { Text, Appbar, useTheme } from 'react-native-paper'

// function TopBar({ title, navigation }) {

//   const theme = useTheme()

//   return (
//     <Appbar.Header elevated={true} style={{ backgroundColor: theme.colors.primary }}>
//       <Appbar.BackAction onPress={() => { }} color="white" />
//       <Appbar.Content title={title} color="white" />
//       <Appbar.Action icon="calendar" color="white" onPress={() => { }} />
//       <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
//     </Appbar.Header>
//   )
// }

// export default TopBar


// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })