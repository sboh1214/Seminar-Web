import { SearchIcon } from '@chakra-ui/icons'
import { Box, HStack } from '@chakra-ui/layout'
import { Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AnonymousHeader from './anonymousHeader'
import UserHeader from './userHeader'
import Link from 'next/link'

export default function Header(): JSX.Element {
  const [isSignIn, setIsSignIn] = useState<boolean>(false)

  useEffect(() => {
    setIsSignIn(false)
  }, [])

  return (
    <Box
      width="100%"
      height="50px"
      borderTopColor="rgba(235,161,42)"
      borderTopWidth="5px"
    >
      <HStack
        width="100%"
        maxWidth="1024px"
        height="100%"
        margin="6px"
        spacing="6px"
      >
        <Link href="/">
          <Button colorScheme="teal" variant="ghost">
            Seminar
          </Button>
        </Link>
        <InputGroup width="480px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="검색" />
        </InputGroup>
        {isSignIn ? <UserHeader /> : <AnonymousHeader />}
      </HStack>
    </Box>
  )
}
