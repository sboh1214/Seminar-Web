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
      seminars: data.seminars.split(','),
    })
      .then((res: AxiosResponse) => {
        toastSuccess(toast, `Created series named "${data.title}"`)
        router.push(`/series/${res.data}`)
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
          <FormControl id="seminars">
            <FormLabel>Seminar List</FormLabel>
            <Input type="text" {...register('seminars')} />
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
