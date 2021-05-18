import { Heading } from "@chakra-ui/layout";
import Frame from "../../components/frame";
import { useRouter } from 'next/router'

export default function Seminar() {
  const router = useRouter()
  const { id } = router.query

  return <Frame>
    <Heading>
      세미나 제목
    </Heading>
  </Frame>
}
