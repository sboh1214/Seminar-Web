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
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function UserHeader(): JSX.Element {
  return (
    <HStack>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="teal" variant="solid">
            Profile
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Hello!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
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
