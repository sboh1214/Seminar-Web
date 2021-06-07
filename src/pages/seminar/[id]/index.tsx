import { Heading, Box, AspectRatio, Text, Flex } from '@chakra-ui/layout'
import Frame from '../../../components/frame'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API } from '../../../configs'
import { AxiosError, AxiosResponse } from 'axios'
import { createStandaloneToast } from '@chakra-ui/toast'
import { Skeleton } from '@chakra-ui/skeleton'
import { toastError } from '../../../util/toast'
import NotFound from '../../../components/notFound'

enum State {
  Loading,
  Complete,
  Error,
}

export default function Seminar(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const toast = createStandaloneToast()
  const [seminar, setSeminar] = useState(null)
  const [state, setState] = useState<State>(State.Loading)

  useEffect(() => {
    API.get(`/seminar/query/${id}`)
      .then((res: AxiosResponse) => {
        setSeminar(res.data)
        setState(State.Complete)
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }, [])

  if (state == State.Error) {
    return <NotFound message={`There is no seminar with id "${id}".`} />
  }
  return (
    <Frame>
      <Flex>
        <Box flex={2}>
          <Text>{`ID: ${id}`}</Text>
          <Skeleton isLoaded={state == State.Complete}>
            <Heading marginY={3}>{seminar?.title}</Heading>
          </Skeleton>
          <Skeleton isLoaded={state == State.Complete}>
            <Text marginY={3}>
              {seminar?.description ?? 'There is no description.'}
            </Text>
          </Skeleton>
          <AspectRatio ratio={16 / 9}>
            {seminar?.onlineLinks ? (
              <iframe
                width="1664"
                height="776"
                src={seminar?.onlineLinks[0]}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : null}
          </AspectRatio>
        </Box>
        <Box flex={1}></Box>
      </Flex>
    </Frame>
  )
}
