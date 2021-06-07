import {
  Box,
  Button,
  createStandaloneToast,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useState } from 'react'
import Frame from '../../components/frame'
import { API, UserRole } from '../../configs'
import { State } from '../../util/fetch'
import { toastError, toastSuccess } from '../../util/toast'

export default function Admin(): JSX.Element {
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Complete)
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<UserRole>(UserRole.NONE)

  const updateUser = () => {
    setState(State.Loading)
    API.post(`/admin/update/${email}`, { role: role })
      .then(() => {
        setState(State.Complete)
        toastSuccess(toast, `Update role of user "${email}"`)
      })
      .catch((err) => {
        setState(State.Complete)
        toastError(toast, err)
      })
  }

  const deleteUser = () => {
    setState(State.Loading)
    API.get(`/admin/delete/${email}`)
      .then(() => {
        setEmail('')
        setRole(UserRole.NONE)
        setState(State.Complete)
        toastSuccess(toast, `Deleted user "${email}"`)
      })
      .catch((err) => {
        setState(State.Complete)
        toastError(toast, err)
      })
  }

  return (
    <Frame>
      <Box marginY={6} borderWidth={1} borderRadius={6} padding={6}>
        <Heading>{`Edit user's Role`}</Heading>
        <FormLabel marginTop={3}>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(nextValue) => {
            setEmail(nextValue.target.value)
          }}
        />
        <FormControl as="fieldset" marginTop={3}>
          <FormLabel as="legend">Role</FormLabel>
          <RadioGroup
            defaultValue={UserRole.NONE}
            value={role}
            onChange={(nextValue) => {
              setRole(UserRole[nextValue])
            }}
          >
            <HStack spacing="24px">
              <Radio value={UserRole.NONE}>None</Radio>
              <Radio value={UserRole.SPEAKER}>Speaker</Radio>
              <Radio value={UserRole.ADMIN}>Admin</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>
            Be sure that there is at least one admin user.
          </FormHelperText>
        </FormControl>
        <HStack marginTop={6}>
          <Button isDisabled={state === State.Loading} onClick={updateUser}>
            Update
          </Button>
          <Button
            colorScheme="red"
            isDisabled={state === State.Loading}
            onClick={deleteUser}
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </Frame>
  )
}
