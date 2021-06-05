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
  StatusCode,
  toastAxiosError,
  toastInternetError,
  toastServerError,
  toastSuccess,
} from '../../configs'

export default function SeminarCreate(): JSX.Element {
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
    API.post('seminar/create', {
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      onlineLink: [data.onlineLink],
    })
      .then((res: AxiosResponse) => {
        toastSuccess(toast, `Created seminar named "${data.title}"`)
        router.push(`/seminar/${res.data}`)
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          if (err.response.status == StatusCode.BadRequest) {
            toast({
              title: 'Error',
              description: err.response.data,
              status: 'error',
              duration: 5000,
            })
          } else if (err.response.status == StatusCode.InternalServerError) {
            toastServerError(toast, err.response.data)
          }
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
              {errors.email && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input type="text" {...register('description')} />
          </FormControl>
          <FormLabel>{`Start Date & Time`}</FormLabel>
          <FormControl id="startTime">
            <input type="datetime-local" {...register('startTime')} />
          </FormControl>
          <FormLabel>{`End Date & Time`}</FormLabel>
          <FormControl id="endTime">
            <input type="datetime-local" {...register('endTime')} />
          </FormControl>
          <FormControl id="onlineLink">
            <FormLabel>Online Link</FormLabel>
            <Input type="url" {...register('onlineLink')} />
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
