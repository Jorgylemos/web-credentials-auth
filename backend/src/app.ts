import express from 'express'
import { UserRoutes } from './http/controllers/user/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/v1", UserRoutes)

export { app }