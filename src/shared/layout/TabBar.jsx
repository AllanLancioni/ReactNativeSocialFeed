import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, FAB, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BOTTOM_APPBAR_HEIGHT = 50

function TabBar({ state, descriptors, navigation }) {

  const { bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
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
            color={colors.light1}
            icon={dictionaryRouteIcon[route.name]}
            style={{ opacity: isFocused ? 1 : 0.5, flex: 1 }}
            onPress={onPress} />
        })
      }
    </Appbar>
  )
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  }
})

export default TabBar