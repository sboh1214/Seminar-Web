import { Box, Flex, Heading } from '@chakra-ui/layout'
import { createStandaloneToast } from '@chakra-ui/toast'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import SeminarCard from '../components/card/seminarCard'
import SeriesCard from '../components/card/seriesCard'
import Frame from '../components/frame'
import NotFound from '../components/notFound'
import { API } from '../configs'
import { State } from '../util/fetch'
import { toastError } from '../util/toast'

export default function Home(): JSX.Element {
  const toast = createStandaloneToast()
  const [state, setState] = useState<State>(State.Loading)
  const [seriesArray, setSeriesArray] = useState<[any]>(null)
  const [seminars, setSeminars] = useState<[any]>(null)

  useEffect(() => {
    API.get('/series/query')
      .then((res: AxiosResponse) => {
        setSeriesArray(res.data)
        setState(State.Complete)
      })
      .catch((err) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }, [])

  useEffect(() => {
    API.get('/seminar/query')
      .then((res: AxiosResponse) => {
        setSeminars(res.data)
        setState(State.Complete)
      })
      .catch((err) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }, [])

  if (state === State.NotFound) {
    return <NotFound message="Impossible" />
  }
  return (
    <Frame>
      <Flex>
        <Box flex={1}>
          <Heading>Series</Heading>
          {seriesArray?.map((series) => {
            if (series) {
              return <SeriesCard series={series} key={series.id} />
            }
          }) ?? 'No series.'}
        </Box>
        <Box flex={1}>
          <Heading>Seminars</Heading>
          {seminars?.map((seminar) => {
            if (seminar) {
              return <SeminarCard seminar={seminar} key={seminar.id} />
            }
          }) ?? 'No seminars.'}
        </Box>
      </Flex>
    </Frame>
  )
}
