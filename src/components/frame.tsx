import { ChakraProvider, Container } from '@chakra-ui/react'
import Header from './header'

export default function Frame({ children }): JSX.Element {
  return (
    <ChakraProvider>
      <Header />
      <Container>{children}</Container>
    </ChakraProvider>
  )
}
