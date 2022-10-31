import { StyleSheet, View } from "react-native"
import { useFormContext, Controller } from "react-hook-form"
import FormError from "./FormError"
import { useState } from "react"
import { TextInput } from 'react-native-paper'

function TextInputGroup({ name, label, secureTextEntry }) {

  const { control } = useFormContext()
  const [isSecure, setIsSecure] = useState(secureTextEntry)

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            placeholder={label}
            mode="outlined"
            value={value}            
            onBlur={onBlur}            
            style={{ backgroundColor: 'rgba(255,255,255,.1)' }}
            textColor="white"
            placeholderTextColor="gray"
            onChangeText={value => onChange(value)}    
            right={secureTextEntry && <TextInput.Icon color={focused => focused ? "white" : "gray"} icon="eye" onPress={() => setIsSecure(v => !v)} />}
            secureTextEntry={isSecure}
          />
        )}
      />
      <FormError name={name} />
    </View>
  )
}

export default TextInputGroup

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 12,
  }
})