import { StyleSheet, ImageBackground, View } from "react-native"
import { useForm, FormProvider } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInputGroup from "../shared/components/TextInputGroup"
import { EndlessConstellation } from "../../assets/images"
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase"
import Toast from 'react-native-toast-message'
import { handleError } from "../helpers/errors-handler"
import { useState } from "react"

const schema = yup.object().shape({
  displayName: yup
    .string()
    .required('O nome não pode ser vazio'),
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Formato de email inválido!'),
  password: yup
    .string()
    .required('A senha não pode ser vazia')
    .min(6, 'A senha deve conter pelo menos 6 dígitos'),
  confirmPassword: yup
    .string()
    .required('A confirmação de senha não pode ser vazia')
    .min(6, 'A confirmação de senha deve conter pelo menos 6 dígitos')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
}).required()

function SignUp({ navigation }) {

  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const methods = useForm({
    resolver: yupResolver(schema), reValidateMode: 'onSubmit',
    mode: 'onBlur'
  })

  const onSubmit = async ({ email, password, displayName }) => {
    setLoading(true)
    displayName = displayName.toUpperCase()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName })
      Toast.show({ type: 'success', text2: 'Usuário registrado com sucesso!' })
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro!', text2: handleError(error.code) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={EndlessConstellation} resizeMode="cover" style={styles.image}>
        <FormProvider {...methods}>
          <Text variant="displayLarge" style={styles.title}>Sign Up</Text>
          <TextInputGroup dark label="Nome Completo" name="displayName" />
          <TextInputGroup dark label="Email" name="email" />
          <TextInputGroup dark label="Password" name="password" secureTextEntry={true} />
          <TextInputGroup dark label="Confirm Password" name="confirmPassword" secureTextEntry={true} />
        </FormProvider>
        <Button
          mode="contained"
          buttonColor={theme.colors.secondary}
          style={{ marginTop: 8 }}
          uppercase
          loading={loading}
          onPress={methods.handleSubmit(onSubmit)}>
          Registrar
        </Button>
        <Divider style={{ marginVertical: 18 }} />
        <Button textColor="white" uppercase onPress={() => navigation.popToTop()} icon="keyboard-backspace">
          Voltar para Login
        </Button>
      </ImageBackground>
    </View>
  )
}

export default SignUp


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