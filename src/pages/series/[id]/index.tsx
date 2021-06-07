import { Heading } from '@chakra-ui/layout'
import {
  Button,
  createStandaloneToast,
  Link,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
  const { id } = router.query
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Loading)
  const [series, setSeries] = useState(null)
  const [seminars, setSeminars] = useState<[any]>(null)

  useEffect(() => {
    API.get(`/series/query/${id}`)
      .then((res: AxiosResponse) => {
        setSeries(res.data)
        setState(State.Complete)
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
        <Link href={`/series/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </Skeleton>
    </Frame>
  )
}
