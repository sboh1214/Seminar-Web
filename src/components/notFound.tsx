import Frame from './frame'
import { Box, Button, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound({ message }): JSX.Element {
  return (
    <Frame>
      <Box alignSelf="center" marginTop="30%">
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          404
        </Text>
        <Text
          bgGradient="linear(to-r, teal.500,green.500)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Not Found
        </Text>
        <Text marginY="12">{message}</Text>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </Box>
    </Frame>
  )
}
