import { FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Heading } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Textarea } from '@chakra-ui/textarea'
import { createStandaloneToast } from '@chakra-ui/toast'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Frame from '../../../components/frame'
import { API } from '../../../configs'
import { fetchSeminar, State } from '../../../util/fetch'
import { toastError, toastSuccess } from '../../../util/toast'
import { AxiosError } from 'axios'

export default function SeriesEdit(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Loading)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [seminars, setSeminars] = useState<string>('')

  const setSeries = (series) => {
    setTitle(series.title)
    setDescription(series.description)
    setSeminars(series.seminars.join(','))
  }

  fetchSeminar(id, setSeries, setState, toast)

  const updateSeries = () => {
    setState(State.Loading)
    API.post(`/series/update/${id}`, {
      title,
      description,
      seminars: seminars.split(','),
    })
      .then(() => {
        setState(State.Complete)
        toastSuccess(toast, 'Successfully updated')
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }

  const deleteSeries = () => {
    setState(State.Loading)
    API.get(`/series/delete/${id}`)
      .then(() => {
        setState(State.Complete)
        toastSuccess(toast, 'Successfully deleted')
        router.push('/')
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }

  return (
    <Frame>
      <Box marginY={6} borderWidth={1} borderRadius={6} padding={6}>
        <Heading>Edit Series ID: {id}</Heading>
        <Skeleton isLoaded={state !== State.Loading}>
          <FormLabel marginTop={3}>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
          <FormLabel marginTop={3}>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
          <FormLabel marginTop={3}>Seminar List</FormLabel>
          <Textarea
            value={seminars}
            onChange={(event) => {
              setSeminars(event.target.value)
            }}
          />
        </Skeleton>
        <Button
          marginTop={6}
          isDisabled={state === State.Loading}
          onClick={updateSeries}
        >
          Update
        </Button>
      </Box>
      <Box borderWidth={1} borderRadius={6} padding={6}>
        <Heading size="lg">Danger Zone</Heading>
        <Button
          colorScheme="red"
          marginTop={6}
          isDisabled={state === State.Loading}
          onClick={deleteSeries}
        >
          Delete
        </Button>
      </Box>
    </Frame>
  )
}
