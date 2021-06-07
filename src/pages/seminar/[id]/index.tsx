import { Heading, HStack, Box, AspectRatio, Text } from '@chakra-ui/layout'
import Frame from '../../../components/frame'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API } from '../../../configs'
import { AxiosError, AxiosResponse } from 'axios'
import { createStandaloneToast } from '@chakra-ui/toast'
import { Skeleton } from '@chakra-ui/skeleton'
import { Button } from '@chakra-ui/button'
import { toastError } from '../../../util/toast'

enum State {
  Loading,
  Complete,
  Error,
}

export default function Seminar(): JSX.Element {
  const router = useRouter()
  const toast = createStandaloneToast()
  const [seminar, setSeminar] = useState(null)
  const [state, setState] = useState<State>(State.Loading)

  useEffect(() => {
    const { id } = router.query
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
    return (
      <Frame>
        <Button
          onClick={() => {
            router.reload()
          }}
        >
          Reload
        </Button>
      </Frame>
    )
  }
  return (
    <Frame>
      <Skeleton isLoaded={state == State.Complete}>
        <Heading>{seminar?.title}</Heading>
      </Skeleton>
      <Skeleton isLoaded={state == State.Complete}>
        <Text>{seminar?.description ?? 'There is no description.'}</Text>
      </Skeleton>
      <HStack>
        <Box bg="tomato" w="100%" p={4} color="white">
          <AspectRatio ratio={16 / 9}>
            <iframe
              width="1664"
              height="776"
              src="https://www.youtube.com/embed/FQZ3g-cXYlk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </Box>
        <Box bg="yellow" w="360px" p={4} color="white">
          This is the Box
        </Box>
      </HStack>
    </Frame>
  )
}
