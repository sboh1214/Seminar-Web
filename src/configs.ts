import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/'
    : 'https://sparcs-seminar.herokuapp.com',
  withCredentials: true,
})

export const StatusCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  NotImplemented: 501,
}

export enum UserRole {
  NONE = 'NONE',
  SPEAKER = 'SPEAKER',
  ADMIN = 'ADMIN',
}
