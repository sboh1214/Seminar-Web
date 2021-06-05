import { Heading, HStack, Box, AspectRatio } from '@chakra-ui/layout'
import Frame from '../../components/frame'
import { useRouter } from 'next/router'

export default function Seminar(): JSX.Element {
  const router = useRouter()
  const { id } = router.query

  return (
    <Frame>
      <Heading>세미나 제목</Heading>
      <HStack>
        <Box bg="tomato" w="100%" p={4} color="white">
          <AspectRatio ratio={16 / 9}>
            <iframe
              width="1664"
              height="776"
              src="https://www.youtube.com/embed/FQZ3g-cXYlk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </Box>
        <Box bg="yellow" w="360px" p={4} color="white">
          This is the Box
        </Box>
      </HStack>
    </Frame>
  )
}
