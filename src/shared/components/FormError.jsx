import { StyleSheet, View } from "react-native"
import { useFormContext } from "react-hook-form"
import { Text } from 'react-native-paper'

function FormError({ name }) {

  const { formState: { errors } } = useFormContext()

  return (
    <View style={styles.container}>
      { errors[name] && <Text style={styles.error}>{ errors[name]?.message }</Text> }
    </View>
  )
}

export default FormError

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  error: {
    color: '#ef5350',
    fontWeight: 'bold'
  }
})