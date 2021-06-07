import { IconButton } from '@chakra-ui/button'
import { AddIcon, AtSignIcon, DeleteIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Box, HStack, List, ListIcon, ListItem } from '@chakra-ui/layout'
import { useState } from 'react'

export default function UserList({ users, addUser, deleteUser }): JSX.Element {
  const [newUser, setNewUser] = useState<string>('')

  return (
    <Box>
      <List spacing={3}>
        {users.map((user) => (
          <ListItem key={user.email}>
            <ListIcon as={AtSignIcon} />
            {user.email}
            <IconButton
              aria-label="Delete user"
              icon={<DeleteIcon />}
              onClick={() => {
                deleteUser()
              }}
            />
          </ListItem>
        ))}
      </List>
      <HStack>
        <Input value={newUser} />
        <IconButton
          aria-label="Add user"
          icon={<AddIcon />}
          onClick={() => {
            addUser(newUser)
            setNewUser('')
          }}
        />
      </HStack>
    </Box>
  )
}
