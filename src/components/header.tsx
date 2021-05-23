import { SearchIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack } from '@chakra-ui/layout'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export default function Header(): JSX.Element {
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
        <Heading size="md">Seminar</Heading>
        <InputGroup width="480px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="검색" />
        </InputGroup>
      </HStack>
    </Box>
  )
}
