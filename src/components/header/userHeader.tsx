import { HStack } from '@chakra-ui/layout'
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function UserHeader({ user }): JSX.Element {
  return (
    <HStack>
      {user.role === 'ADMIN' ? (
        <Link href="/admin">
          <Button colorScheme="teal" variant="outline">
            Admin
          </Button>
        </Link>
      ) : null}
      {user.role === 'SPEAKER' || user.role === 'ADMIN' ? (
        <>
          <Link href="/seminar/create">
            <Button colorScheme="teal" variant="outline">
              Create seminar
            </Button>
          </Link>
          <Link href="/series/create">
            <Button colorScheme="teal" variant="outline">
              Create series
            </Button>
          </Link>
        </>
      ) : null}
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="teal" variant="solid">
            Profile
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{user.email}</PopoverHeader>
          <PopoverBody>
            <Text>{user.localName ?? 'Please set your local name.'}</Text>
            <Text>{user.englishName ?? 'Please set your english name.'}</Text>
          </PopoverBody>
          <PopoverFooter>
            <Link href="/user/signout">
              <Button colorScheme="teal" variant="outline">
                Sign Out
              </Button>
            </Link>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}
