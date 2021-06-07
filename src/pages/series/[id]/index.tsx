import { Heading } from '@chakra-ui/layout'
import { createStandaloneToast, Skeleton, Text } from '@chakra-ui/react'
import { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SeminarCard from '../../../components/card/seminarCard'
import Frame from '../../../components/frame'
import { API } from '../../../configs'
import { toastError } from '../../../util/toast'

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
  const [seminars, setSeminars] = useState<[any]>(null)

  useEffect(() => {
    const { id } = router.query
    API.get(`/series/query/${id}`)
      .then((res: AxiosResponse) => {
        setSeries(res.data)
        const promises = series.seminars?.map((seminar) => {
          API.get(`/seminar/query/${seminar}`)
        })
        Promise.all(promises).then((seminars) => {
          //@ts-ignore
          setSeminars(seminars)
          setState(State.Complete)
        })
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }, [])

  return (
    <Frame>
      <Skeleton isLoaded={state !== State.Loading}>
        <Heading>{series?.title}</Heading>
        <Text>{series?.description ?? 'There is no description'}</Text>
        {seminars?.map((seminar) => {
          return <SeminarCard seminar={seminar} key={seminar.id} />
        })}
      </Skeleton>
    </Frame>
  )
}
