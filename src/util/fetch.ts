import { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { API } from '../configs'
import { toastError } from './toast'

export enum State {
  Loading,
  Complete,
  NotFound,
  Error,
}

export function fetchSeminar(id, setSeminar, setState, toast): void {
  useEffect(() => {
    API.get(`/seminar/query/${id}`)
      .then((res: AxiosResponse) => {
        setSeminar(res.data)
        setState(State.Complete)
      })
      .catch((err: AxiosError) => {
        setState(State.Error)
        toastError(toast, err)
      })
  }, [])
}
