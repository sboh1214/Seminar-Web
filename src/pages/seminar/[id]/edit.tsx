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

  const setSeminar = (seminar) => {
    setTitle(seminar.title)
    setDescription(seminar.description)
  }

  fetchSeminar(id, setSeminar, setState, toast)

  const updateSeminar = () => {
    setState(State.Loading)
    API.post(`/seminar/update/${id}`)
      .then(() => {
        setState(State.Complete)
        toastSuccess(toast, 'Successfully updated')
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }

  return (
    <Frame>
      <Box>
        <Heading>Edit Seminar ID: {id}</Heading>
        <Skeleton isLoaded={state !== State.Loading}>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} />
          <FormLabel>Description</FormLabel>
          <Textarea value={description} />
        </Skeleton>
        <Button isDisabled={state === State.Loading} onClick={updateSeminar}>
          Update
        </Button>
      </Box>
    </Frame>
  )
}
