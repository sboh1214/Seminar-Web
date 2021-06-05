import { UseToastOptions } from '@chakra-ui/toast'
import axios from 'axios'

export const API = axios.create({
  baseURL: `http://localhost:8000/`,
  withCredentials: true,
})

export const StatusCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  InternalServerError: 500,
  NotImplemented: 501,
}

type ToastFunction = (options?: UseToastOptions) => string | number

export function toastSuccess(toast: ToastFunction, message: string): void {
  toast({
    title: 'Success',
    description: message,
    status: 'success',
    duration: 5000,
  })
}

export function toastServerError(toast: ToastFunction, data: any): void {
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

export function toastInternetError(toast: ToastFunction): void {
  toast({
    title: 'Internet Error',
    description: 'Please check your internet connection.',
    status: 'error',
    duration: 5000,
  })
}

export function toastAxiosError(toast: ToastFunction, message: string): void {
  toast({
    title: 'Website Error',
    description: message,
    status: 'error',
    duration: 5000,
  })
}
