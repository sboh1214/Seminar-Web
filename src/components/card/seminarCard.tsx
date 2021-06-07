import { Box, Heading } from '@chakra-ui/layout'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import UserCard from './userCard'

export default function SeminarCard({ seminar }): JSX.Element {
  return (
    <Link href={`/seminar/${seminar.id}`}>
      <Box margin={3} padding={3} borderRadius={12} borderWidth={1}>
        <Heading size="lg">{seminar.title}</Heading>
        <Text marginY={3}>{seminar.description}</Text>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Speakers
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {seminar.users?.map((user) => {
                return <UserCard user={user} key={user.email} />
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Link>
  )
}
