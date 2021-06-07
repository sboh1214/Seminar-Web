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
import { API } from '../../configs'
import { toastError, toastSuccess } from '../../util/toast'

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
        toastError(toast, err)
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
