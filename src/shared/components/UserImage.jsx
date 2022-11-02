import { useContext } from "react"
import { Avatar } from "react-native-paper"
import { AuthContext } from "../../contexts/AuthContext"

function UserImage({ size }) {

  const { user } = useContext(AuthContext)

  if (user?.photoURL)
    return <Avatar.Image size={size} source={user?.photoURL} />

  let avatarLabel
  const words = (user?.displayName || '').split(' ')
  if (words.length > 1)
    avatarLabel = words[0].charAt(0) + words[words.length - 1].charAt(0)
  else
    avatarLabel += user?.displayName.slice(0, 2).toUppercase()

  return <Avatar.Text size={size} label={avatarLabel} />
}

export default UserImage