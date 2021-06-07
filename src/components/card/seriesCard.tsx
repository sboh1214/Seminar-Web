import { Box } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function SeriesCard({ series }): JSX.Element {
  return (
    <Box margin={3} padding={3} borderRadius={12} borderWidth={1}>
      <Link href={`/series/${series.id}`}>
        <Box>
          <Text>{series.title}</Text>
          <Text>{series.description}</Text>
        </Box>
      </Link>
    </Box>
  )
}
