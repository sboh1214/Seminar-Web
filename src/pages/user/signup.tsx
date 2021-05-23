import { Container, Button } from '@chakra-ui/react'
import Frame from '../../components/frame'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function SignUp(): JSX.Element {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { isSubmitting } = useFormState({ control })
  const onSubmit = (data) => {
    router.push('/')
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
          <FormControl id="englishName" isInvalid={errors.englishName}>
            <FormLabel>English Name</FormLabel>
            <Input type="text" {...register('englishName')} />
            <FormErrorMessage>
              {errors.englishName && 'This field is required'}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="koreanName" isInvalid={errors.koreanName}>
            <FormLabel>Korean Name</FormLabel>
            <Input type="text" {...register('koreanName')} />
            <FormErrorMessage>
              {errors.koreanName && 'This field is required'}
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