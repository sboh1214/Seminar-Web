import { Container, Button, createStandaloneToast } from '@chakra-ui/react'
import Frame from '../../components/frame'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  API,
  StatusCode,
  toastAxiosError,
  toastInternetError,
  toastServerError,
  toastSuccess,
} from '../../configs'
import { AxiosError, AxiosResponse } from 'axios'

export default function SignIn(): JSX.Element {
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
    API.post(
      'auth/signin',
      { email: data.email, password: data.password },
    )
      .then((_: AxiosResponse) => {
        toastSuccess(toast, "Welcome back!")
        router.push((router.query.from as string) ?? '/')
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
      <Container maxW="xl" centerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              defaultValue={router.query.email}
              {...register('email', { required: true })}
            />
            <FormErrorMessage>
              {errors.email && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register('password', { required: true })}
            />
            <FormErrorMessage>
              {errors.password && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Container>
    </Frame>
  )
}
