const FALLBACK = 'Falha ao realizar ação!'

export const errorMap = new Map()

errorMap.set('auth/email-already-in-use', 'Email já cadastrado!')
errorMap.set('auth/user-not-found', 'Usuário não encontrado!')
errorMap.set('auth/wrong-password', 'Senha Incorreta!')

export function handleError(errorCode, fallback = FALLBACK) {
  return errorMap.get(errorCode) || fallback
} 