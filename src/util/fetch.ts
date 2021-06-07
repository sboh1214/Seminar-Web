import { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { API, StatusCode } from '../configs'
import { toastServerError, toastInternetError, toastAxiosError } from './toast'

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
        if (err.response) {
          if (err.response.status == StatusCode.NotFound) {
            toastServerError(toast, err.response.data)
          } else if (err.response.status == StatusCode.InternalServerError) {
            toastServerError(toast, err.response.data)
          }
        } else if (err.request) {
          toastInternetError(toast)
        } else {
          toastAxiosError(toast, err.message)
        }
      })
  }, [])
}
