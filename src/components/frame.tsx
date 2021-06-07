import { ChakraProvider, Flex } from '@chakra-ui/react'
import Header from './header'

export default function Frame({ children }): JSX.Element {
  return (
    <ChakraProvider>
      <Header />
      <Flex marginX="24px" marginTop="24px">
        {children}
      </Flex>
    </ChakraProvider>
  )
}
