import {
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useForm, useFormState } from 'react-hook-form'
import Frame from '../../components/frame'
import {
  API,
  toastAxiosError,
  toastInternetError,
  toastServerError,
  toastSuccess,
} from '../../configs'

export default function SeriesCreate(): JSX.Element {
  const router = useRouter()
  const toast = createStandaloneToast()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { isSubmitting } = useFormState({ control })

  const onSubmit = (data) => {
    API.post('series/create', {
      title: data.title,
      description: data.description,
      seminars: [],
    })
      .then((res: AxiosResponse) => {
        toastSuccess(toast, `Created series named "${data.title}"`)
        router.push(`/series/${res.data}`)
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          toastServerError(toast, err.response.data)
        } else if (err.request) {
          toastInternetError(toast)
        } else {
          toastAxiosError(toast, err.message)
        }
      })
  }

  return (
    <Frame>
      <Container maxW="1024px" width="100%" centerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="title" isInvalid={errors.title} isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" {...register('title', { required: true })} />
            <FormErrorMessage>
              {errors.title && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input type="text" {...register('description')} />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </form>
      </Container>
    </Frame>
  )
}
