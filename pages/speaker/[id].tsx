import { Heading } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import Frame from '../../components/frame'

export default function Speaker(): JSX.Element {
  const router = useRouter()
  const { id } = router.query

  return (
    <Frame>
      <Heading>{`Speaker Name`}</Heading>
    </Frame>
  )
}
