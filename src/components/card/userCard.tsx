import { Avatar, Box, Badge, Text, Skeleton, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function UserCard({ user }): JSX.Element {
  return (
    <Link href={`/user/${user?.email}`}>
      <Box
        _hover={{
          background: 'teal.100',
        }}
        margin={3}
        padding={3}
        borderRadius={12}
        borderWidth={1}
      >
        <Skeleton isLoaded={user}>
          <HStack>
            <Avatar name={user?.englishName ?? 'Null'} />
            <Box ml="3">
              <Text
                marginLeft={1}
                fontWeight="bold"
              >{`${user?.localName} | ${user?.englishName}`}</Text>
              <Text fontSize="sm">
                <Badge ml="1" colorScheme="green">
                  {user?.role}
                </Badge>
                {` ${user?.email}`}
              </Text>
            </Box>
          </HStack>
        </Skeleton>
      </Box>
    </Link>
  )
}
