import { createStandaloneToast } from '@chakra-ui/toast'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UserCard from '../../components/card/userCard'
import Frame from '../../components/frame'
import NotFound from '../../components/notFound'
import { API } from '../../configs'
import { State } from '../../util/fetch'
import { toastError } from '../../util/toast'

export default function User(): JSX.Element {
  const router = useRouter()
  const { email } = router.query
  const toast = createStandaloneToast()

  const [state, setState] = useState<State>(State.Loading)
  const [user, setUser] = useState(null)

  useEffect(() => {
    API.get(`/user/query/${email}`)
      .then((res: AxiosResponse) => {
        setUser(res.data)
        setState(State.Complete)
      })
      .catch((err) => {
        toastError(toast, err)
        setState(State.Error)
      })
  }, [])

  if (state === State.Error) {
    return <NotFound message={`There is no such user with email "${email}"`} />
  }
  return (
    <Frame>
      <UserCard user={user} />
    </Frame>
  )
}
