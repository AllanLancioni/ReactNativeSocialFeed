import { StyleSheet, ImageBackground, View } from "react-native"
import { useForm, FormProvider } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInputGroup from "../shared/components/TextInputGroup"
import { EndlessConstellation } from "../../assets/images"
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { signInWithEmailAndPassword } from "firebase/auth"
import Toast from 'react-native-toast-message'
import { useState } from "react"
import { handleError } from "../helpers/errors-handler"
import { auth } from "../../firebase"

const schema = yup.object().shape({
  email: yup
    .string()
    .required('O email não pode ser vazio!')
    .email('Formato de email inválido!'),
  password: yup
    .string()
    .required('A senha não pode ser vazia')
    .min(6, 'A senha deve conter pelo menos 6 dígitos')
}).required()

function Login({ navigation }) {
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const methods = useForm({
    resolver: yupResolver(schema), reValidateMode: 'onSubmit',
    mode: 'onBlur'
  })

  
  const login = async ({email, password}) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
      Toast.show({ type: 'error', text1: 'Erro!', text2: handleError(error.code) })
    } finally {
      setLoading(false)
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={EndlessConstellation} resizeMode="cover" style={styles.image}>
        <FormProvider {...methods}>
          <Text variant="displayLarge" style={styles.title}>MyApp</Text>
          <TextInputGroup dark label="Email" name="email" />
          <TextInputGroup dark label="Password" name="password" secureTextEntry={true} />
        </FormProvider>
        <Button
            mode="contained"
            buttonColor={theme.colors.secondary} 
            style={{ marginTop: 8 }}
            uppercase
            loading={loading}   
            // disabled={loading}
            onPress={methods.handleSubmit(login)}>
              Entrar
          </Button>
        <Divider style={{ marginVertical: 18 }} />
        <Button textColor="white" uppercase onPress={() => navigation.push('SignUp')}>Registrar</Button>
      </ImageBackground>
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
  title: {
    marginBottom: 18,
    color: 'white',
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 24,
    color: 'white'
  },
})