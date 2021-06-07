import { CircularProgress } from '@chakra-ui/progress'
import { createStandaloneToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Frame from '../../components/frame'
import { API } from '../../configs'
import { toastError, toastSuccess } from '../../util/toast'

export default function SignOut(): JSX.Element {
  const router = useRouter()
  const toast = createStandaloneToast()

  useEffect(() => {
    API.get('auth/signout')
      .then(() => {
        toastSuccess(toast, 'See you later!')
        router.push('/')
      })
      .catch((err) => {
        toastError(toast, err)
      })
  }, [])

  return (
    <Frame>
      <CircularProgress isIndeterminate />
    </Frame>
  )
}
