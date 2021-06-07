import { Box, ChakraProvider } from '@chakra-ui/react'
import Header from './header'

export default function Frame({ children }): JSX.Element {
  return (
    <ChakraProvider>
      <Header />
      <Box marginX="24px" marginTop="24px">
        {children}
      </Box>
    </ChakraProvider>
  )
}
