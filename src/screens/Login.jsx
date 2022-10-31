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
  username: yup
    .string()
    .required('O username não pode ser vazio'),
  password: yup
    .string()
    .required('A senha não pode ser vazia')
    .min(6, 'A senha deve conter pelo menos 6 dígitos')
}).required()

function Login({ navigation }) {
  const theme = useTheme()

  const methods = useForm({
    resolver: yupResolver(schema), reValidateMode: 'onSubmit',
    mode: 'onBlur'
  })
  const { handleSubmit, register } = methods
  // const { login, user } = useContext(AuthContext)

  const onSubmit = (value) => {

    console.log('value', value)

    // login(value)
    //   .then(() => navigation.navigate('Home'))
    //   .catch(err => console.error(err))
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={EndlessConstellation} resizeMode="cover" style={styles.image}>
        <FormProvider {...methods}>
          <Text variant="displayLarge" style={styles.title}>MyApp</Text>
          <TextInputGroup
            label="Username"
            register={register}
            name="username"
          />
          <TextInputGroup
            label="Password"
            register={register}
            name="password"
            secureTextEntry={true}
          />
          
        </FormProvider>
        <Button
            mode="contained"
            buttonColor={theme.colors.secondary} 
            style={{ marginTop: 8 }}
            uppercase   
            onPress={handleSubmit(onSubmit)}>
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