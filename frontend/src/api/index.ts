import axios, { AxiosRequestConfig } from 'axios'


const api = axios.create({
    baseURL: "http://localhost:4000/api/v1"
})

// POST
export const createUser = (body: object, config?: AxiosRequestConfig) => api.post('/user', body, config)
export const authUser = (body: object, config?: AxiosRequestConfig) => api.post('/auth', body, config)

// GET
export const getUser = () => api.post('/me/profile')
