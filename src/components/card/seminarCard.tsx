import { Box, Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function SeminarCard({ seminar }): JSX.Element {
  return (
    <Box margin={3} padding={3} borderRadius={12} borderWidth={1}>
      <Link href={`/seminar/${seminar.id}`}>
        <Box>
          <Heading size="md">{seminar.title}</Heading>
          <Text marginY={3}>{seminar.description}</Text>
        </Box>
      </Link>
    </Box>
  )
}
