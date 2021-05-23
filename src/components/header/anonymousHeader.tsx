import { HStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function AnonymousHeader(): JSX.Element {
  return (
    <HStack>
      <Link href="/user/signin">
        <Button colorScheme="teal" variant="outline">
          Sign In
        </Button>
      </Link>
      <Link href="/user/signup">
        <Button colorScheme="teal" variant="solid">
          Sign Up
        </Button>
      </Link>
    </HStack>
  )
}
