import { Box } from '@chakra-ui/layout'
import { Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function SeriesCard({ series }): JSX.Element {
  return (
    <Box
      _hover={{
        background: 'teal.100',
      }}
      margin={3}
      padding={3}
      borderRadius={12}
      borderWidth={1}
    >
      <Link href={`/series/${series.id}`}>
        <Box>
          <Heading size="md">{series.title}</Heading>
          <Text>{series.description}</Text>
        </Box>
      </Link>
    </Box>
  )
}
