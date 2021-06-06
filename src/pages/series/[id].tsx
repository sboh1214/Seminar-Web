import { Heading } from '@chakra-ui/layout'
import { createStandaloneToast, Skeleton, Text } from '@chakra-ui/react'
import { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Frame from '../../components/frame'
import {
  API,
  StatusCode,
  toastAxiosError,
  toastInternetError,
  toastServerError,
} from '../../configs'

enum State {
  Loading,
  Complete,
  Error,
}

export default function Series(): JSX.Element {
  const router = useRouter()
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Loading)
  const [series, setSeries] = useState(null)

  useEffect(() => {
    const { id } = router.query
    API.get(`/series/query/${id}`)
      .then((res: AxiosResponse) => {
        setSeries(res.data)
        setState(State.Complete)
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        if (err.response) {
          if (err.response.status == StatusCode.NotFound) {
            toastServerError(toast, err.response.data)
          } else if (err.response.status == StatusCode.InternalServerError) {
            toastServerError(toast, err.response.data)
          }
        } else if (err.request) {
          toastInternetError(toast)
        } else {
          toastAxiosError(toast, err.message)
        }
      })
  }, [])

  return (
    <Frame>
      <Skeleton isLoaded={state !== State.Loading}>
        <Heading>{series?.title}</Heading>
        <Text>{series?.description ?? 'There is no description'}</Text>
      </Skeleton>
    </Frame>
  )
}
