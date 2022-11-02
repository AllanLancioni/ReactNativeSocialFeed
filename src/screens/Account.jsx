import { useContext, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text, Divider, IconButton, useTheme, Button, Portal, Dialog } from "react-native-paper"
import { auth } from "../../firebase"
import { AuthContext } from "../contexts/AuthContext"
import UserImage from '../shared/components/UserImage'
import { useForm, FormProvider } from "react-hook-form"
import TextInputGroup from "../shared/components/TextInputGroup"
import Toast from 'react-native-toast-message'
import { updateProfile } from "firebase/auth"

function Account({ navigation }) {

  const { user } = useContext(AuthContext)
  const [isUserNameDialogVisible, setUserNameDialogVisible] = useState(false)

  const changeImage = () => {}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>
      <UserImage size={160} onPress={() => changeImage()} />
      <IconButton style={styles.changeImageIcon} icon="camera" mode="contained" animated={true} onPress={() => changeImage()} />
      <Text style={styles.subtitle}>Informação pessoal</Text>
      <Divider style={styles.divider} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{user.displayName}</Text>
        <IconButton size={20} onPress={() => setUserNameDialogVisible(true)} icon="pencil" />
      </View>
      <Text>{user.email}</Text>
      <Divider style={styles.divider} />

      <Button uppercase onPress={() => auth.signOut()}>Sair</Button>

      <EditUserNameDialog 
        user={user}
        visible={isUserNameDialogVisible}
        hideDialog={() => setUserNameDialogVisible(false)} />
    </View>
  )
}

function EditUserNameDialog({ visible, hideDialog, user }) {
  const methods = useForm({ mode: "onBlur" })
  methods.setValue('displayName', user.displayName)
  const [isLoading, setIsLoading] = useState(false)

  const save = async ({ displayName }) => {
    setIsLoading(true)
    try {
      await updateProfile(user, { displayName: displayName.toUpperCase() })
      Toast.show({ type: 'success', text1: 'Uhuul!', text2: 'Nome de usuário atualizazado!' })
      hideDialog()
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro!', text2: handleError(error.code) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Editar nome</Dialog.Title>
        <FormProvider {...methods}>
          <Dialog.Content>
            <TextInputGroup label="Nome Completo" name="displayName" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={isLoading} onPress={hideDialog}>Cancelar</Button>
            <Button disabled={isLoading} onPress={methods.handleSubmit(save)}>OK</Button>
          </Dialog.Actions>
        </FormProvider>
      </Dialog>
    </Portal>
  )
}


export default Account

const styles = StyleSheet.create({
  title: {
    marginVertical: 16,
    fontSize: 32,
  },
  subtitle: {
    marginVertical: 8,
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 16
  },
  divider: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  changeImageIcon: {
    marginTop: -40,
    left: 64
  },
  editableField: {

  }
})