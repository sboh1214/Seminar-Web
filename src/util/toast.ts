import { UseToastOptions } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { StatusCode } from '../configs'

type ToastFunction = (options?: UseToastOptions) => string | number

export function toastSuccess(toast: ToastFunction, message: string): void {
  toast({
    title: 'Success',
    description: message,
    status: 'success',
    duration: 5000,
  })
}

export function toastError(toast: ToastFunction, err: AxiosError): void {
  if (err.response) {
    if (err.response.status == StatusCode.NotFound) {
      toastServerError(toast, err.response.data)
    } else if (err.response.status == StatusCode.BadRequest) {
      toastServerError(toast, err.response.data)
    } else if (err.response.status == StatusCode.InternalServerError) {
      toastServerError(toast, err.response.data)
    } else {
      toastServerError(toast, err.response.data)
    }
  } else if (err.request) {
    toastInternetError(toast)
  } else {
    toastAxiosError(toast, err.message)
  }
}

function toastServerError(toast: ToastFunction, data: any): void {
  let message = 'No message from server.'
  if (typeof data == 'string') {
    message = data
  }
  toast({
    title: 'Server Error',
    description: message,
    status: 'error',
    duration: 5000,
  })
}

function toastInternetError(toast: ToastFunction): void {
  toast({
    title: 'Internet Error',
    description: 'Please check your internet connection.',
    status: 'error',
    duration: 5000,
  })
}

function toastAxiosError(toast: ToastFunction, message: string): void {
  toast({
    title: 'Website Error',
    description: message,
    status: 'error',
    duration: 5000,
  })
}
