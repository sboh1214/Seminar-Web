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

export default function SeminarEdit(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Loading)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [onlineLinks, setOnlineLinks] = useState<string>('')
  const [series, setSeries] = useState<string>('')

  const setSeminar = (seminar) => {
    setTitle(seminar.title)
    setDescription(seminar.description)
    setOnlineLinks(seminar.onlineLinks.join(''))
    setSeries(seminar.series.join(','))
  }

  fetchSeminar(id, setSeminar, setState, toast)

  const updateSeminar = () => {
    setState(State.Loading)
    API.post(`/seminar/update/${id}`, {
      title,
      description,
      onlineLinks: onlineLinks.split(','),
      series: series.split(','),
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

  const deleteSeminar = () => {
    setState(State.Loading)
    API.get(`/seminar/delete/${id}`)
      .then(() => {
        setState(State.Complete)
        toastSuccess(toast, 'Successfully deleted')
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }

  return (
    <Frame>
      <Box marginY={6} borderWidth={1} borderRadius={6} padding={6}>
        <Heading>Edit Seminar ID: {id}</Heading>
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
          <FormLabel marginTop={3}>Online Links</FormLabel>
          <Textarea
            value={onlineLinks}
            onChange={(event) => {
              setOnlineLinks(event.target.value)
            }}
          />
          <FormLabel marginTop={3}>Series</FormLabel>
          <Textarea
            value={series}
            onChange={(event) => {
              setSeries(event.target.value)
            }}
          />
        </Skeleton>
        <Button
          marginTop={6}
          isDisabled={state === State.Loading}
          onClick={updateSeminar}
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
          onClick={deleteSeminar}
        >
          Delete
        </Button>
      </Box>
    </Frame>
  )
}
