import { useContext } from "react"
import { StyleSheet, ImageBackground, View } from "react-native"
import { AuthContext } from "../contexts/AuthContext"
import { useForm, FormProvider } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextInputGroup from "../shared/components/TextInputGroup"
import { EndlessConstellation } from "../../assets/images"
import { Button, Divider, Text, useTheme } from 'react-native-paper'

const schema = yup.object().shape({
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
  const theme = useTheme()

  const methods = useForm({
    resolver: yupResolver(schema), reValidateMode: 'onSubmit',
    mode: 'onBlur'
  })
  const { handleSubmit, register } = methods
  const { createUser } = useContext(AuthContext)

  const onSubmit = (value) => {

    console.log('value', value)
    createUser(value)
      .then(() => navigation.navigate('Home'))
      .catch(err => console.error(err))
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={EndlessConstellation} resizeMode="cover" style={styles.image}>
        <FormProvider {...methods}>
          <Text variant="displayLarge" style={styles.title}>Sign Up</Text>
          <TextInputGroup label="Email" name="email" />
          <TextInputGroup label="Password" name="password" secureTextEntry={true} />
          <TextInputGroup label="Confirm Password" name="confirmPassword" secureTextEntry={true} />
        </FormProvider>
        <Button
            mode="contained"
            buttonColor={theme.colors.secondary} 
            style={{ marginTop: 8 }}
            uppercase   
            onPress={handleSubmit(onSubmit)}>
              Registrar
          </Button>
        <Divider style={{ marginVertical: 18 }} />
        <Button textColor="white" uppercase onPress={() => navigation.popToTop()} icon="keyboard-backspace">Voltar para Login</Button>
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