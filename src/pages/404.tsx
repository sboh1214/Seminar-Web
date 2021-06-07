import Frame from '../components/frame'
import { Text } from '@chakra-ui/react'

export default function NotFound(): JSX.Element {
  return (
    <Frame>
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
    </Frame>
  )
}
