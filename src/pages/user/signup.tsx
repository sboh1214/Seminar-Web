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
import { API, StatusCode } from '../../configs'
import { AxiosError, AxiosResponse } from 'axios'
import { toastError, toastSuccess } from '../../util/toast'

export default function SignUp(): JSX.Element {
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
    if (data.password != data.passwordCheck) {
      toast({
        title: 'Error',
        description: "The passwords don't match.",
        status: 'error',
        duration: 5000,
      })
      return
    }
    API.post(`auth/signup`, {
      email: data.email,
      password: data.password,
      localName: data.localName,
      englishName: data.englishName,
    })
      .then((res: AxiosResponse) => {
        if (res.status == StatusCode.Created) {
          toastSuccess(toast, 'Your account created.')
          router.push(`/user/signin?email=${data.email}`)
        }
      })
      .catch((err: AxiosError) => {
        toastError(toast, err)
      })
  }

  return (
    <Frame>
      <Container maxW="xl" centerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register('email', { required: true })} />
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
          <FormControl id="passwordCheck" isInvalid={errors.passwordCheck}>
            <FormLabel>Rewrite Password</FormLabel>
            <Input
              type="password"
              {...register('passwordCheck', { required: true })}
            />
            <FormErrorMessage>
              {errors.passwordCheck && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="localName" isInvalid={errors.localName}>
            <FormLabel>Local Name</FormLabel>
            <Input type="text" {...register('localName')} />
            <FormErrorMessage>
              {errors.localName && 'Error'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="englishName" isInvalid={errors.englishName}>
            <FormLabel>English Name</FormLabel>
            <Input type="text" {...register('englishName')} />
            <FormErrorMessage>
              {errors.englishName && 'Error'}
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
